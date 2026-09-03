#!/usr/bin/env bun

import { resolve } from "node:path"
import {
  examineFilePopulation,
  examinePopulation,
} from "../../../../../tools/lib/check-workflow/population"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"
import { repoFilesAt } from "../../../../../tools/lib/repo-files-at.ts"
import {
  type ChangeClosure,
  describeClosure,
  resolveChangeClosure,
} from "../../modules/change-closure/change-closure.module.code.ts"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  findGuardedResolveViolations,
  type GuardedResolveViolation,
} from "../../modules/guarded-resolve/guarded-resolve.module.code.ts"
import { repoTopLevelDirs } from "../../modules/repo-path-resolver/repo-path-resolver.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { CHECK_EXEMPT_DIRS } from "../../modules/repo-scope/repo-scope.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[guarded-resolve]"

const CLOSURE_WIDENING_PATHS = [
  "packages/infra/checks/src/",
  "packages/shared/graph/producers/src/",
]

const OUTSIDE_THE_RULE =
  "UNEXAMINED rather than clean, being outside the rule: a guard asking `Bun.file(p).exists()` or a `statSync` in a try/catch, which the `existsSync` prefilter drops before the walk; a path reached by two variable hops; a collection whose sense is unread (`filter(exists)`, `every(!exists)`, `some(exists)`, or a predicate body doing more than returning one `existsSync`); and any interpolated, computed or reassigned path segment."

const OUTSIDE_A_NARROWED_RUN =
  "This run read only the change, so a guard authored earlier that became a landmine HERE — its target committed by this change, where it had been gitignored and legitimate — is outside it too."

function coverageCaveat(closure: ChangeClosure): string {
  if (closure.kind === "whole-tree") return OUTSIDE_THE_RULE
  return `${OUTSIDE_THE_RULE} ${OUTSIDE_A_NARROWED_RUN}`
}

function main(): never {
  const { flags } = parseArgs(Bun.argv.slice(2), STANDARD_FLAGS)
  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()

  const trackedFiles = repoFilesAt(repoRoot, {
    includeFixtures: true,
    includeGenerated: true,
  })
  const trackedSet = new Set(trackedFiles)
  const trackedDirs = new Set<string>()
  for (const rel of trackedFiles) {
    let slash = rel.lastIndexOf("/")
    while (slash > 0) {
      trackedDirs.add(rel.slice(0, slash))
      slash = rel.lastIndexOf("/", slash - 1)
    }
  }
  const isGitTracked = (p: string): boolean => trackedSet.has(p) || trackedDirs.has(p)
  const topLevelDirs = repoTopLevelDirs(trackedFiles)

  const closure: ChangeClosure = resolveChangeClosure({
    repoRoot,
    widening: CLOSURE_WIDENING_PATHS,
  })
  const inClosure = (rel: string): boolean =>
    closure.kind === "whole-tree" || closure.files.has(rel)

  const isExemptDir = (rel: string): boolean =>
    rel.split("/").some((segment) => CHECK_EXEMPT_DIRS.has(segment))
  const scanFiles = trackedFiles.filter(
    (rel) => (rel.endsWith(".ts") || rel.endsWith(".tsx")) && !isExemptDir(rel) && inClosure(rel)
  )

  if (scanFiles.length === 0 && closure.kind === "changed-files") {
    const { population } = examinePopulation<string, never>({
      members: [...closure.files].sort(),
      unit: "files this change touched",
      membership: {
        kind: "enumerated",
        because:
          "the members are `closure.files` itself, the `Set` `resolveChangeClosure` already built in memory — this branch is reached only on the `changed-files` arm, which exists only because a manifest was read whole",
      },
      labelOf: (rel) => rel,
      siteOf: (rel) => `${repoRoot}/${rel}`,
      examine: () => [],
    })
    exitOnResult<GuardedResolveViolation>({
      violations: [],
      options: {
        population,
        format: flags.json ? "json" : "human",
        prefix: PREFIX,
        successMessage: `No git-tracked TypeScript source lies in ${describeClosure(closure)}, so this change could not have authored a silent-skip guard. ${coverageCaveat(closure)}`,
      },
    })
  }

  const { population, violations } = examineFilePopulation<GuardedResolveViolation>({
    files: scanFiles,
    unit: `source files in ${describeClosure(closure)}`,
    membership: {
      kind: "enumerated",
      because:
        "`repoFilesAt` throws with git's own stderr when `git ls-files` fails rather than returning `[]` — the swallow it was written to delete (#15967) — so a shorter list is fewer `.ts`/`.tsx` files git reports in the tree; the closure narrowing it is a `Set` already in memory, which `resolveChangeClosure` widens to whole-tree when no manifest states the change rather than returning an empty one",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) => {
      if (!source.includes("existsSync")) return []
      return findGuardedResolveViolations({ source, filePath: rel, isGitTracked, topLevelDirs })
    },
  })

  exitOnResult<GuardedResolveViolation>({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `silent-skip guards over statically-resolvable, git-tracked repo paths (a reorg would silently skip these instead of failing loud). ${coverageCaveat(closure)}`,
      successMessage: `No silent-skip landmine guards over git-tracked repo paths. ${coverageCaveat(closure)}`,
      groupBy: (v) => v.file,
      formatViolation: (v) =>
        `line ${v.line}: ${v.guardKind} guard over git-tracked '${v.resolvedRel}' (arg: ${v.literal}) — make it fail loud (assert presence / console.error + process.exit) so a stale committed path reds the check instead of silently skipping`,
    },
  })
}

if (import.meta.main) {
  try {
    main()
  } catch (err) {
    console.error(`${PREFIX} Unexpected error:`, err)
    process.exit(2)
  }
}
