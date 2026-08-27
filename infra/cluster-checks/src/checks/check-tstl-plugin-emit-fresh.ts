#!/usr/bin/env bun

import { readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { listWorkspaceDirs } from "../../../../tools/lib/check-workflow/workspace-paths.ts"
import { z } from "zod"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args"
import { findFiles } from "../../../../tools/lib/check-workflow/file-finder"
import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"
import { remediationHint } from "../../../../tools/lib/check-workflow/remediation-doc"
import { getRepoRoot } from "../lib/repo-root"
import {
  deriveTstlPluginEmits,
  findStaleTstlPlugins,
  type TstlPluginDrift,
} from "../lib/tstl-plugin-emit"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[tstl-plugin-emit-fresh]"
const SUCCESS_MESSAGE = "Every TSTL plugin `.js` is the fresh transpile of its `.ts` source."
const REMEDIATION_DOC = remediationHint(
  "regenerate: bun infra/cluster-checks/src/checks/check-tstl-plugin-emit-fresh.ts --write"
)

const WORKSPACE_NAME_SCHEMA = z.object({ name: z.string().optional() })

interface PluginBaseline {
  readonly basename: string
  readonly tsSource: string
}

function loadPluginBaselines(
  repoRoot: string,
  basenames: readonly string[]
): ReadonlyMap<string, PluginBaseline> {
  const baselines = new Map<string, PluginBaseline>()
  for (const basename of basenames) {
    baselines.set(`${basename}.js`, {
      basename,
      tsSource: readFileSync(join(repoRoot, `${basename}.ts`), "utf8"),
    })
  }
  return baselines
}

function readWorkspaceRoots(repoRoot: string): ReadonlyMap<string, string> {
  const roots = new Map<string, string>()
  for (const dir of listWorkspaceDirs(repoRoot)) {
    const manifest = WORKSPACE_NAME_SCHEMA.parse(
      JSON.parse(readFileSync(join(repoRoot, dir, "package.json"), "utf8"))
    )
    const name = manifest.name
    if (name !== undefined && name !== "" && !roots.has(name)) roots.set(name, dir)
  }
  return roots
}

function deriveBasenames(repoRoot: string): readonly string[] {
  const configs = findFiles({
    cwd: repoRoot,
    patterns: ["packages/**/tsconfig*.json"],
    absolute: false,
  }).map((rel) => ({ rel, text: readFileSync(join(repoRoot, rel), "utf8") }))

  const { basenames, unresolved } = deriveTstlPluginEmits(configs, readWorkspaceRoots(repoRoot))
  if (unresolved.length > 0) {
    const named = unresolved.map((d) => `${d.config} → ${d.specifier}`).join("; ")
    throw new Error(
      `${unresolved.length} tstl.luaPlugins specifier(s) name no committed .js on this tree, so what TSTL loads cannot be established: ${named}. Spell each as a path relative to the tsconfig TSTL compiles, or as a workspace package subpath (\`@temper/addons/plugins/<name>.js\`), which is the spelling that survives being inherited through \`extends\`.`
    )
  }
  return basenames
}

function main(): undefined {
  let flags: { json: boolean; write: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(process.argv.slice(2), {
      ...STANDARD_FLAGS,
      write: { kind: "boolean" },
    })
    flags = { json: parsed.flags.json, write: parsed.flags.write, repoRoot: parsed.flags.repoRoot }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()

  let basenames: readonly string[]
  let baselines: ReadonlyMap<string, PluginBaseline>
  try {
    basenames = deriveBasenames(repoRoot)
    baselines = loadPluginBaselines(repoRoot, basenames)
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const { population, violations: stale } = examineFilePopulation<TstlPluginDrift>({
    files: basenames.map((basename) => `${basename}.js`),
    unit: "committed plugin emits",
    membership: {
      kind: "atLeast",
      members: 1,
      from:
        "the addon tree cannot compile without a plugin declaration — every addon tsconfig " +
        "inherits `tstl.luaPlugins` from `packages/temper/addons/tsconfig.base.json` — so a run " +
        "deriving none has lost the declaration or come back short of the tsconfigs carrying it, " +
        "and either is a reason to refuse rather than certify a set nobody is in",
    },
    pathOf: (rel) => join(repoRoot, rel),
    scan: (rel, committedJs) => {
      const baseline = baselines.get(rel)
      if (baseline === undefined) return []
      return findStaleTstlPlugins([
        { basename: baseline.basename, tsSource: baseline.tsSource, committedJs },
      ])
    },
  })

  if (flags.write) {
    for (const s of stale) writeFileSync(join(repoRoot, `${s.basename}.js`), s.freshJs)
    const summary =
      stale.length === 0
        ? "all plugin `.js` already fresh — nothing to rewrite"
        : `rewrote ${stale.length} stale plugin .js: ${stale.map((s) => s.basename).join(", ")}`
    process.stdout.write(`${PREFIX} ${summary}\n`)
    process.exit(0)
  }

  exitOnResult({
    violations: stale.map((s) => ({
      file: `${s.basename}.js`,
      message:
        "stale relative to its `.ts` source — the committed emit does not match a fresh transpile",
    })),
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `${stale.length} TSTL plugin .js file(s) stale relative to their .ts source`,
      successMessage: SUCCESS_MESSAGE,
      remediationDoc: REMEDIATION_DOC,
    },
  })
}

if (import.meta.main) {
  main()
}
