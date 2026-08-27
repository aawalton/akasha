#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { repoFilesAt } from "../../../../tools/lib/repo-files-at.ts"
import { ownRepoRoot } from "../../../../repo/roots/roots"
import ts from "typescript"
import { z } from "zod"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import { removalArm, shellArm } from "../lib/tmpfs-scratch-arms.ts"
import {
  type CoverageViolation,
  PENDING_SIZE,
  reconcileTmpfsScratch,
} from "../lib/tmpfs-scratch-coverage.ts"
import { scanTmpfsScratch, spellsTmpfsRoot } from "../lib/ts-tmpfs-scratch.ts"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[tmpfs-scratch]"
const CONFIG_FILE = "infra/cluster-checks/src/lib/tmpfs-scratch.config.json"

const CONFIG_SCHEMA = z
  .object({
    pending: z.array(
      z
        .object({
          path: z.string(),
          entriesPerRun: z.number().nullable(),
          unmeasured: z.string().optional(),
        })
        .strict()
    ),
    exceptions: z.record(z.string(), z.never()),
  })
  .strict()

const TS_FILE = /\.(ts|tsx|mts|cts)$/
const SHELL_FILE = /\.(sh|bash)$/

function main(): never {
  const bail = (message: string): never => exitOnToolError({ error: message, prefix: PREFIX })

  let parsed: ReturnType<typeof parseArgs<typeof STANDARD_FLAGS>>
  try {
    parsed = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  } catch (err) {
    return bail(errorMessage(err))
  }

  const repoRoot = parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot()
  const configPath = resolve(ownRepoRoot(), CONFIG_FILE)
  if (!existsSync(configPath)) return bail(`config not found: ${configPath}`)

  let config: z.infer<typeof CONFIG_SCHEMA>
  try {
    config = CONFIG_SCHEMA.parse(JSON.parse(readFileSync(configPath, "utf-8")))
  } catch (err) {
    return bail(`${CONFIG_FILE}: ${errorMessage(err)}`)
  }

  let repoFiles: readonly string[]
  try {
    repoFiles = repoFilesAt(repoRoot)
  } catch (err) {
    return bail(errorMessage(err))
  }

  const { population: shellPopulation, violations: shellSpelling } = examineFilePopulation<string>({
    files: repoFiles.filter((f) => SHELL_FILE.test(f)),
    unit: "shell files",
    membership: {
      kind: "enumerated",
      because:
        "`repoFiles` came from `repoFilesAt`, which throws with git's own stderr when " +
        "`git ls-files` fails rather than returning an empty list, and that throw is caught " +
        "above and bails — so fewer members means fewer shell files tracked in the repo",
    },
    pathOf: (label) => resolve(repoRoot, label),
    scan: (label, source) => (spellsTmpfsRoot(source) ? [label] : []),
  })
  const shell = { population: shellPopulation, spelling: shellSpelling.length }

  const { population, violations: found } = examineFilePopulation<string>({
    files: repoFiles.filter((f) => TS_FILE.test(f)),
    unit: "TypeScript files",
    membership: {
      kind: "enumerated",
      because:
        "`repoFiles` came from `repoFilesAt`, which throws with git's own stderr when " +
        "`git ls-files` fails rather than returning an empty list, and that throw is caught " +
        "above and bails — so fewer members means fewer TypeScript files tracked in the repo",
    },
    pathOf: (label) => resolve(repoRoot, label),
    scan: (label, source) => {
      if (!spellsTmpfsRoot(source)) return []
      const kind = label.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
      const sf = ts.createSourceFile(label, source, ts.ScriptTarget.Latest, true, kind)
      return scanTmpfsScratch(sf).length > 0 ? [label] : []
    },
  })

  const { violations, resolved, tally } = reconcileTmpfsScratch({
    detected: found,
    config,
    declaredSize: PENDING_SIZE,
    fileExists: (relPath) => existsSync(resolve(repoRoot, relPath)),
  })

  const summary =
    `${tally.detected} file(s) create scratch under /tmp — ` +
    `${tally.pending} on the ratchet, ${tally.exceptions} declared exception(s), ` +
    `${tally.unclassified} undeclared.`

  const drift: readonly string[] =
    resolved.length === 0
      ? [`RATCHET — ${tally.ratchet} entries, none resolved. PENDING_SIZE agrees with the tree.`]
      : [
          `RATCHET — ${tally.ratchet} entries, ${resolved.length} already resolved elsewhere and ` +
            `awaiting removal. Dropping them and lowering PENDING_SIZE to ` +
            `${tally.ratchet - resolved.length} is the whole repair. Nothing is held on the ` +
            "branch until somebody makes it, and none of these is a new leak:",
          ...resolved.map((r) => `  ${r.file} (${r.kind})`),
        ]

  return exitOnResult<CoverageViolation>({
    violations,
    options: {
      population,
      format: parsed.flags.json ? "json" : "human",
      prefix: PREFIX,
      header: "a file creates scratch under /tmp, which is tmpfs and shared by every seat",
      successMessage: [
        `OK — ${summary}`,
        ...drift.map((l) => `  ${l}`),
        ...shellArm(shell).map((l) => `  ${l}`),
        ...removalArm().map((l) => `  ${l}`),
      ].join("\n"),
      formatViolation: (v) => (v.file != null ? `${v.file} — ${v.message}` : v.message),
      footer: (count) =>
        [
          `${PREFIX} ${count} violation(s)`,
          `${PREFIX} ${summary}`,
          ...drift.map((l) => `${PREFIX} ${l}`),
          ...shellArm(shell).map((l) => `${PREFIX} ${l}`),
          ...removalArm().map((l) => `${PREFIX} ${l}`),
        ].join("\n"),
    },
  })
}

main()
