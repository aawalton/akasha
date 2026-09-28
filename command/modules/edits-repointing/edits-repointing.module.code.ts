import { seat } from "akasha/agent/seat/seat.page-type.ts"
import { subagent } from "akasha/agent/subagent/subagent.page-type.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  editsIn,
  editsWaiting,
  keptEdits,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const KEEPERS: readonly string[] = [seat.slug, subagent.slug]

const PARTED = "/"

export function movedPath(path: string, moves: readonly FileMove[]): string {
  for (const one of moves) {
    if (path === one.from) return one.to
    if (path.startsWith(`${one.from}${PARTED}`)) return `${one.to}${path.slice(one.from.length)}`
  }
  return path
}

export function repointed(row: FileChange, moves: readonly FileMove[]): FileChange {
  if (row.kind === "move") {
    return {
      ...row,
      pathFrom: movedPath(row.pathFrom, moves),
      pathTo: movedPath(row.pathTo, moves),
    }
  }
  if (row.kind === "bring" && row.pathFrom !== undefined) {
    return { ...row, path: movedPath(row.path, moves), pathFrom: movedPath(row.pathFrom, moves) }
  }
  return { ...row, path: movedPath(row.path, moves) }
}

function carriesLanded(rows: readonly FileChange[], moves: readonly FileMove[]): boolean {
  return rows.some(
    (one) =>
      one.kind === "move" &&
      moves.some((move) => move.from === one.pathFrom && move.to === one.pathTo)
  )
}

function rowsAfter(
  rows: readonly FileChange[],
  moves: readonly FileMove[]
): readonly FileChange[] | null {
  if (carriesLanded(rows, moves)) return null
  const next = rows.map((one) => repointed(one, moves))
  const same = next.every((one, at) => JSON.stringify(one) === JSON.stringify(rows[at]))
  return same ? null : next
}

function pending(root: string, page: string, moves: readonly FileMove[]): boolean {
  if (!editsWaiting(root, page)) return false
  const held = editsIn(root, page)
  return !("why" in held) && rowsAfter(held.rows, moves) !== null
}

export function repointedIn(
  root: string,
  pages: readonly string[],
  moves: readonly FileMove[]
): readonly string[] {
  const wrong: string[] = []
  if (moves.length === 0) return wrong
  for (const page of pages) {
    try {
      if (!pending(root, page, moves)) continue
      keptEdits(root, page, (had) => rowsAfter(had, moves) ?? had)
    } catch (thrown) {
      wrong.push(
        `the drafted edits beside \`${page}\` still name the paths moved: ${whyOf(thrown)}`
      )
    }
  }
  return wrong
}

export function editsRepointed(root: string, moves: readonly FileMove[]): readonly string[] {
  if (moves.length === 0) return []
  const pages = KEEPERS.flatMap((type) => everyOfType(root, type).map((one) => one.path))
  return repointedIn(root, pages, moves)
}
