import { gitMv, isWithin } from "./fs"
import type { Logger } from "./logger"
import type { WorkspaceMove } from "./types"

const TMP_SUFFIX = "__pkgmove_tmp__"

export function applyMove(root: string, move: WorkspaceMove, log: Logger): undefined {
  if (move.old === move.new) {
    log.info(`[move] (skip, same path) ${move.old}`)
    return
  }

  if (isWithin(move.old, move.new)) {
    const tmpPath = `${move.old}${TMP_SUFFIX}`
    log.info(`[move] ${move.old} → ${tmpPath} → ${move.new}`)
    gitMv(root, move.old, tmpPath)
    gitMv(root, tmpPath, move.new)
    return
  }

  log.info(`[move] ${move.old} → ${move.new}`)
  gitMv(root, move.old, move.new)
}
