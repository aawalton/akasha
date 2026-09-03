import {
  formatPorcelainEntry,
  PORCELAIN_STATUS_ARGS,
  parsePorcelainStatusZ,
} from "@akasha/git/porcelain-status"
import { cleanupArtifacts, regenerateLockfile } from "./cleanup"
import { rewriteCodeText } from "./code-text-rewrites"
import { rewriteImports } from "./codemod"
import { rewriteConfigs } from "./config-rewrites"
import { rewriteDocs } from "./docs-rewrites"
import { runCapture } from "./fs"
import type { Logger } from "./logger"
import { applyMove } from "./moves"
import { organizeImports } from "./organize-imports"
import { rewritePackageJsons } from "./package-json-rewrites"
import { rewriteTsconfigs } from "./tsconfig-rewrites"
import type { WorkspaceMove } from "./types"

export interface RunPackageMoveInput {
  readonly move: WorkspaceMove
  readonly root: string
  readonly log: Logger
}

export function assertCleanWorktree(root: string): undefined {
  const { stdout, status } = runCapture(root, "git", [...PORCELAIN_STATUS_ARGS])
  if (status !== 0) {
    throw new Error(`git status failed in ${root}`)
  }
  const parsed = parsePorcelainStatusZ(stdout)
  if (!parsed.ok) {
    throw new Error(`git status in ${root} was unreadable: ${parsed.error}`)
  }
  if (parsed.entries.length > 0) {
    const listed = parsed.entries.map((e) => formatPorcelainEntry(e)).join("\n")
    throw new Error(`worktree ${root} is not clean — commit or stash first:\n${listed}`)
  }
}

export async function runPackageMove(input: RunPackageMoveInput): Promise<void> {
  const { move, root, log } = input

  log.info(`\n[0/11] Asserting clean worktree (${root})…`)
  assertCleanWorktree(root)

  log.info(`\n[1/11] git mv ${move.old} → ${move.new}`)
  applyMove(root, move, log)

  log.info("\n[2/11] package.json rewrites")
  rewritePackageJsons(root, move, log)

  log.info("\n[3/11] tsconfig.json rewrites")
  rewriteTsconfigs(root, move, log)

  log.info("\n[4/11] Import codemod")
  const rewrittenImportFiles = rewriteImports(root, move, log)

  log.info("\n[5/11] Organize imports (re-sort rewritten import blocks)")
  organizeImports(root, rewrittenImportFiles, log)

  log.info("\n[6/11] Code text sweep (comments, JSDoc)")
  rewriteCodeText(root, move, log)

  log.info("\n[7/11] Config file rewrites")
  rewriteConfigs(root, move, log)

  log.info("\n[8/10] Docs rewrites")
  rewriteDocs(root, move, log)

  log.info("\n[9/10] Cleanup (tsbuildinfo, stale dist/)")
  cleanupArtifacts(root, log)

  log.info("\n[10/10] Regenerate lockfile (bun install)")
  regenerateLockfile(root, log)

  log.info("\n[done] package move applied")
}
