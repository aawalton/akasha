#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  loadAllTestFiles,
  loadWorkspaces,
} from "../../../../../tools/lib/check-workflow/test-step-loader"
import { detectTestType } from "../../../../../tools/lib/check-workflow/test-step-paths"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  bunfigRegisters,
  collectObligations,
  type PreloadKind,
  preloadRemedy,
  preloadsNeededBy,
} from "../../modules/test-preload-obligations/test-preload-obligations.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[test-step-paths]"
const repoRoot =
  parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
  getRepoRoot()

interface StepPathIssue {
  readonly message: string
}

type TestFileFinding =
  | { readonly kind: "orphan"; readonly file: string }
  | {
      readonly kind: "needs-preload"
      readonly file: string
      readonly workspace: string
      readonly preload: PreloadKind
    }

function main(): never {
  const workspaces = loadWorkspaces(repoRoot)
  const sortedRoots = workspaces.map((w) => w.root).sort((a, b) => b.length - a.length)
  const ownerOf = (file: string): string | undefined =>
    sortedRoots.find((r) => file === r || file.startsWith(`${r}/`))

  const testFiles = loadAllTestFiles(repoRoot)

  const { population, violations: findings } = examinePopulation<string, TestFileFinding>({
    members: testFiles,
    unit: "test files",
    labelOf: (file) => file,
    siteOf: (file) => resolve(repoRoot, file),
    examine: (file) => {
      const workspace = ownerOf(file)
      if (workspace === undefined) {
        return detectTestType(file) === undefined ? [] : [{ kind: "orphan", file }]
      }
      return preloadsNeededBy(file).map((preload) => ({
        kind: "needs-preload" as const,
        file,
        workspace,
        preload,
      }))
    },
    membership: {
      kind: "enumerated",
      because:
        "`loadAllTestFiles` builds the list with `Bun.Glob.scanSync` over `repoRoot`, " +
        "which raises ENOENT on a root that is not there, so a shorter list is fewer test " +
        "files on disk",
    },
  })

  const errors: StepPathIssue[] = []
  const issue = (...lines: readonly string[]): undefined => {
    errors.push({ message: lines.join("\n") })
  }

  const orphaned = findings.filter((f) => f.kind === "orphan").map((f) => f.file)
  if (orphaned.length > 0) {
    issue(
      `${orphaned.length} test file(s) live outside every declared workspace root:`,
      ...orphaned.map((f) => `      ${f}`),
      "    Add the enclosing directory to the `workspaces` array in the root package.json, or move the file under an existing workspace."
    )
  }

  const obligations = collectObligations(
    findings.flatMap((f) =>
      f.kind === "needs-preload" ? [{ file: f.file, workspace: f.workspace, kind: f.preload }] : []
    )
  )
  for (const obligation of obligations) {
    const bunfigPath = resolve(repoRoot, obligation.workspace, "bunfig.toml")
    const bunfigExists = existsSync(bunfigPath)
    const bunfig = bunfigExists ? readFileSync(bunfigPath, "utf-8") : ""
    if (bunfigRegisters(bunfig)) continue
    issue(...preloadRemedy(obligation, bunfigExists))
  }

  const obligatedWorkspaces = new Set(obligations.map((o) => o.workspace)).size
  return exitOnResult<StepPathIssue>({
    violations: errors,
    options: {
      prefix: PREFIX,
      header:
        "Test files no runner will reach, and workspaces missing the preload their tests need",
      successMessage:
        `OK — ${testFiles.length} test file(s) read across ${workspaces.length} workspace(s); ` +
        `every CI-enrolled one sits inside a declared workspace root, and all ${obligations.length} ` +
        `preload obligation(s) across ${obligatedWorkspaces} workspace(s) are registered.`,
      population,
      formatViolation: (v) => v.message,
    },
  })
}

main()
