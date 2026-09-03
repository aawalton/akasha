#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { basename, dirname, posix, relative, resolve } from "node:path"
import { z } from "zod"
import { parseArgs, STANDARD_FLAGS } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { discoverRepoFiles } from "../../../../../infra/cluster-checks/src/lib/repo-files.ts"
import {
  repoTopLevelDirs,
  resolveRepoPath,
} from "../../../../../infra/cluster-checks/src/lib/repo-path-resolver.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import {
  extractShellLuaPathLiterals,
  extractTsPathLiterals,
} from "../../../../../infra/cluster-checks/src/lib/ts-path-literals.ts"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { listWorkspaceDirs } from "../../../../../tools/lib/check-workflow/workspace-paths"
import { parseMdLinks } from "../../../../../tools/lib/graph/producers/file/md-file/parse.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-repo-paths]"

interface Violation {
  file: string
  line: number
  literal: string
  message?: string
}

const { flags } = parseArgs(Bun.argv.slice(2), STANDARD_FLAGS)

const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()

const trackedSet: Set<string> = new Set(
  discoverRepoFiles(repoRoot, { includeFixtures: true, includeGenerated: true })
)

const topLevelDirs = repoTopLevelDirs(trackedSet)

function workspaceDirCount(): number {
  try {
    return listWorkspaceDirs(repoRoot).length
  } catch (error) {
    return exitOnToolError({ error, prefix: PREFIX })
  }
}

function isSynthArtifactOfCommit(rel: string): boolean {
  if (!rel.endsWith(".generated.yaml")) return false
  const generatedDir = dirname(rel)
  if (basename(generatedDir) !== "generated") return false
  return trackedSet.has(`${dirname(generatedDir)}/synth.ts`)
}

const FIXTURE_FILE_RE =
  /(?:\.|\/|-|_)(test|fixture|fixtures|arbitraries|arbs|test-helpers)\.(ts|tsx|js|jsx)$/

function isTestOrFixture(absPath: string): boolean {
  if (absPath.includes("/__fixtures__/")) return true
  if (FIXTURE_FILE_RE.test(absPath)) return true
  return false
}

function relPathFor(absPath: string): string {
  return relative(repoRoot, absPath)
}

function listFiles(patterns: readonly string[]): readonly string[] {
  const matchers = patterns.map((p) => new Bun.Glob(p))
  return discoverRepoFiles(repoRoot)
    .filter((rel) => matchers.some((g) => z.boolean().parse(g.match(rel))))
    .map((rel) => resolve(repoRoot, rel))
}

function judge(args: {
  file: string
  line: number
  literal: string
  absResolved: string
}): Violation | null {
  const { file, line, literal, absResolved } = args
  const rel = relative(repoRoot, absResolved)
  if (rel.startsWith("..") || resolve(repoRoot, rel) !== absResolved) {
    return { file, line, literal, message: "resolves outside repo root" }
  }
  if (!trackedSet.has(rel) && !isSynthArtifactOfCommit(rel)) return { file, line, literal }
  return null
}

type ScanTarget =
  | { readonly kind: "ts"; readonly abs: string }
  | { readonly kind: "shell"; readonly abs: string }
  | {
      readonly kind: "md-link"
      readonly fromRel: string
      readonly line: number
      readonly rawHref: string
      readonly absResolved: string
    }

const tsFiles = listFiles(["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]).filter(
  (p) => !isTestOrFixture(p)
)

const shellFiles = listFiles(["**/*.sh", "**/*.bash", "**/*.lua"]).filter(
  (p) => !isTestOrFixture(p)
)

const mdLinks: ScanTarget[] = []
for (const fromRel of discoverRepoFiles(repoRoot).filter((rel) => rel.endsWith(".md"))) {
  if (!trackedSet.has(fromRel)) continue
  let content: string
  try {
    content = readFileSync(resolve(repoRoot, fromRel), "utf-8")
  } catch {
    continue
  }
  const baseDir = posix.dirname(fromRel)
  for (const { target, line } of parseMdLinks(content)) {
    const resolvedRel = target === "" ? fromRel : posix.normalize(posix.join(baseDir, target))
    mdLinks.push({
      kind: "md-link",
      fromRel,
      line,
      rawHref: target,
      absResolved: resolve(repoRoot, resolvedRel),
    })
  }
}

const { population, violations } = examinePopulation<ScanTarget, Violation>({
  members: [
    ...tsFiles.map((abs): ScanTarget => ({ kind: "ts", abs })),
    ...shellFiles.map((abs): ScanTarget => ({ kind: "shell", abs })),
    ...mdLinks,
  ],
  unit: "source files and markdown links",
  membership: {
    kind: "atLeast",
    members: workspaceDirCount(),
    from:
      "the workspace directories `listWorkspaceDirs` expands from the code repo's root " +
      "`package.json`, one member at least standing in each — this check body reads a tree it " +
      "is not part of, so a WORKSPACE naming a sparse or partial checkout returns a short " +
      "`git ls-files` rather than raising, and that manifest, read straight off disk, still " +
      "names every package such a checkout is missing",
  },
  labelOf: (target) =>
    target.kind === "md-link" ? `${target.fromRel}:${target.line}` : relPathFor(target.abs),
  siteOf: (target) => (target.kind === "md-link" ? resolve(repoRoot, target.fromRel) : target.abs),
  examine: (target) => {
    if (target.kind === "md-link") {
      const violation = judge({
        file: target.fromRel,
        line: target.line,
        literal: target.rawHref,
        absResolved: target.absResolved,
      })
      return violation === null ? [] : [violation]
    }
    const content = readFileSync(target.abs, "utf-8")
    const file = relPathFor(target.abs)
    const literals =
      target.kind === "ts"
        ? extractTsPathLiterals(content, target.abs, topLevelDirs)
        : extractShellLuaPathLiterals(content, topLevelDirs)
    const found: Violation[] = []
    for (const { literal, line } of literals) {
      const absResolved = resolveRepoPath({ literal, repoRoot, topLevelDirs })
      if (absResolved === null) continue
      const violation = judge({ file, line, literal, absResolved })
      if (violation !== null) found.push(violation)
    }
    return found
  },
})

exitOnResult({
  violations,
  options: {
    population,
    format: flags.json ? "json" : "human",
    prefix: PREFIX,
    header: "string-literal repo paths that do not point at a real file in the repo",
    successMessage: `All ${trackedSet.size} repo files are reachable; every classified path literal resolves.`,
    formatViolation: (v) => {
      const detail = v.message != null ? ` (${v.message})` : ""
      return `${v.file}:${v.line} — '${v.literal}' does not point at a real file${detail}`
    },
  },
})
