import { listFiles, readText, writeText } from "./fs"
import type { Logger } from "./logger"
import { applyBoundaryMatch } from "./rename-primitives"
import type { WorkspaceMove } from "./types"

const CODE_EXTS = [".ts", ".tsx", ".js", ".jsx"]

export function rewriteCodeTextString(
  contents: string,
  oldName: string,
  newName: string
): { next: string; replacements: number } {
  if (oldName === newName) return { next: contents, replacements: 0 }
  const { text, count } = applyBoundaryMatch(contents, oldName, newName)
  return { next: text, replacements: count }
}

export function rewriteCodeText(root: string, move: WorkspaceMove, log: Logger): undefined {
  if (move.oldName === move.newName) {
    log.info("[code-text] no name rename — skipping")
    return
  }

  const files = listFiles(root, ".").filter((path) => CODE_EXTS.some((ext) => path.endsWith(ext)))

  let filesTouched = 0
  let totalReplacements = 0
  for (const path of files) {
    const before = readText(root, path)
    const { next, replacements } = rewriteCodeTextString(before, move.oldName, move.newName)
    if (replacements === 0 || next === before) continue
    writeText(root, path, next)
    filesTouched += 1
    totalReplacements += replacements
  }

  log.info(
    `[code-text] rewrote ${totalReplacements} occurrence(s) across ${filesTouched} file(s) ` +
      `(${files.length} file(s) scanned)`
  )
}
