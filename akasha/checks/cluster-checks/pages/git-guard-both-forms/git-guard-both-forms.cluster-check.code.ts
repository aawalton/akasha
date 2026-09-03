#!/usr/bin/env bun

import { realpathSync } from "node:fs"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder"
import {
  examineFilePopulation,
  examinePopulation,
} from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[git-guard-both-forms]"

const SCAN_GLOBS = ["**/*.ts", "**/*.tsx", "**/*.sh", "**/*.bash"]

const OWN_SOURCE = realpathSync(import.meta.path)

const WHY =
  "CI step pods run in worktree checkouts where `.git` is a FILE, so a `-d` test alone is always false"

const PLAIN_MESSAGE = `one-form \`.git\` guard: ${WHY} — write it as \`[ -d "$X/.git" ] || [ -f "$X/.git" ]\``

const NEGATED_MESSAGE = `one-form \`.git\` guard: ${WHY}, so its negation is always true — write it as \`[ ! -d "$X/.git" ] && [ ! -f "$X/.git" ]\``

const DASH_D_GIT_RE = /\[\s*(!\s+)?-d\s+"?[^"\]]*\/\.git"?\s*\]/g
const DASH_F_GIT_RE = /\[\s*(!\s+)?-f\s+"?[^"\]]*\/\.git"?\s*\]/g

const CONNECTORS_ONLY_RE = /^[\s"'`+\\|&,]*$/
const DISJUNCTION_RE = /\|\|/
const CONJUNCTION_RE = /&&/

export interface GitGuardViolation extends Violation {
  readonly kind: "git-guard-d-only"
  readonly file: string
  readonly line: number
  readonly message: string
}

export interface Span {
  readonly start: number
  readonly end: number
  readonly negated: boolean
}

function spansOf(content: string, pattern: RegExp): readonly Span[] {
  return [...content.matchAll(pattern)].map((m) => ({
    start: m.index,
    end: m.index + m[0].length,
    negated: m[1] !== undefined,
  }))
}

function lineOf(content: string, offset: number): number {
  let line = 1
  for (let i = 0; i < offset; i++) if (content[i] === "\n") line++
  return line
}

function pairs(content: string, d: Span, f: Span): boolean {
  if (d.negated !== f.negated) return false
  const gap =
    f.start >= d.end
      ? content.slice(d.end, f.start)
      : f.end <= d.start
        ? content.slice(f.end, d.start)
        : null
  if (gap === null) return false
  if (!CONNECTORS_ONLY_RE.test(gap)) return false
  return d.negated ? CONJUNCTION_RE.test(gap) : DISJUNCTION_RE.test(gap)
}

export interface GitGuard {
  readonly file: string
  readonly line: number
  readonly content: string
  readonly directoryTest: Span
  readonly fileTests: readonly Span[]
}

export function findGitGuards(content: string, relPath: string): readonly GitGuard[] {
  const dTests = spansOf(content, DASH_D_GIT_RE)
  if (dTests.length === 0) return []
  const fTests = spansOf(content, DASH_F_GIT_RE)
  return dTests.map((directoryTest) => ({
    file: relPath,
    line: lineOf(content, directoryTest.start),
    content,
    directoryTest,
    fileTests: fTests,
  }))
}

export function acceptsBothForms(guard: GitGuard): boolean {
  return guard.fileTests.some((f) => pairs(guard.content, guard.directoryTest, f))
}

function violationFor(guard: GitGuard): GitGuardViolation {
  return {
    kind: "git-guard-d-only",
    file: guard.file,
    line: guard.line,
    message: guard.directoryTest.negated ? NEGATED_MESSAGE : PLAIN_MESSAGE,
  }
}

export function scanForGitGuard(content: string, relPath: string): readonly GitGuardViolation[] {
  return findGitGuards(content, relPath)
    .filter((guard) => !acceptsBothForms(guard))
    .map(violationFor)
}

interface Sited {
  readonly repo: string
  readonly root: string
  readonly guard: GitGuard
}

interface SitedViolation extends GitGuardViolation {
  readonly repo: string
}

const MEMBERSHIP_BECAUSE =
  "the members are every `[ -d …/.git ]` test the two walks above held in memory as they read " +
  "each file, and both walks are asserted above to have read every file they listed — so fewer " +
  "members means fewer directory-form `.git` guards standing in the executed source of the two " +
  "repositories, never a walk that came up short. This check's own body is the one file left out " +
  "of those walks: the guard forms in its messages are documentation of what to write, and " +
  "counting them would let the check certify itself over a tree holding no guard at all"

function main(): never {
  const trees = [
    { repo: "code", root: realpathSync(getRepoRoot()) },
    { repo: "akasha", root: realpathSync(rootFor(resolveRoots(), AKASHA)) },
  ]

  const sited: Sited[] = []
  const gaps: string[] = []
  let walked = 0

  for (const tree of trees) {
    const files = findFiles({ cwd: tree.root, patterns: SCAN_GLOBS, absolute: false }).filter(
      (rel) =>
        !(rel.endsWith(".test.ts") || rel.endsWith(".test.tsx")) &&
        `${tree.root}/${rel}` !== OWN_SOURCE
    )
    walked += files.length
    const walk = examineFilePopulation<never>({
      files,
      unit: "executed-source files",
      membership: {
        kind: "enumerated",
        because:
          "`findFiles` globs the repo root with `Bun.Glob.scanSync`, which raises ENOENT on a " +
          "root that is not there, so a shorter list is fewer executed-source files on disk",
      },
      pathOf: (rel) => `${tree.root}/${rel}`,
      scan: (rel, content) => {
        for (const guard of findGitGuards(content, rel)) {
          sited.push({ repo: tree.repo, root: tree.root, guard })
        }
        return []
      },
    }).population
    for (const gap of walk.unexaminable) gaps.push(`${tree.repo}:${gap.label} — ${gap.reason}`)
  }

  if (gaps.length > 0) {
    return exitOnToolError({
      error: new Error(
        `${gaps.length} of ${walked} executed-source file(s) across the code and instructions ` +
          "trees could not be read, so a `.git` guard in one of them would go unseen: " +
          gaps.join("; ")
      ),
      prefix: PREFIX,
    })
  }

  const { population, violations } = examinePopulation<Sited, SitedViolation>({
    members: sited,
    unit: "`.git` directory guard(s)",
    membership: { kind: "enumerated", because: MEMBERSHIP_BECAUSE },
    labelOf: (s) => `${s.repo}:${s.guard.file}:${s.guard.line}`,
    siteOf: (s) => `${s.root}/${s.guard.file}`,
    examine: (s) => (acceptsBothForms(s.guard) ? [] : [{ ...violationFor(s.guard), repo: s.repo }]),
  })

  return exitOnResult({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header:
        "one-form `.git` guards in executed source (CI step pods run in worktree checkouts where " +
        "`.git` is a FILE — a guard testing only for a directory is always false and misroutes " +
        "the script)",
      successMessage:
        "Every `.git` guard in the executed source of the code and instructions trees accepts " +
        `both the directory form and the worktree-file form, over ${walked} executed-source ` +
        "file(s) walked to find them.",
      groupBy: (v) => `${v.repo} — ${v.file}`,
      formatViolation: (v) => `line ${v.line}: ${v.message}`,
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
