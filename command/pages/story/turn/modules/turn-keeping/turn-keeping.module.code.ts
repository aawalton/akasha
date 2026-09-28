import {
  type FileChange,
  pathsOf,
  replayed,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  appendEdits,
  editsIn,
  keptEdits,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Kept = readonly FileChange[] | { readonly refused: string }

type Lifted = { readonly values: Value; readonly rest: readonly FileChange[] }

type Paged = { readonly at: string; readonly value: Value }

const OWN_KEYS: readonly string[] = ["id", "type", "slug"]

const PAGELESS = "the caller has no page, so none of its drafted edits was found"

function callerPage(root: string, agentId: string | null): string | null {
  return agentId === null || agentId === "" ? null : agentPathOf(root, agentId)
}

export function keptForTurn(root: string, agentId: string | null, turn: string): Kept {
  const page = callerPage(root, agentId)
  if (page === null) return { refused: PAGELESS }
  const wrong: string[] = []
  let moved: readonly FileChange[] = []
  const left = keptEdits(root, page, (had) => {
    if (had.length === 0) return had
    const into = appendEdits(root, turn, had)
    if (!("why" in into)) {
      moved = had
      return null
    }
    wrong.push(into.why)
    return had
  })
  if ("why" in left) return { refused: left.why }
  const why = wrong[0]
  return why === undefined ? moved : { refused: why }
}

export function heldForTurn(root: string, turn: string): Kept {
  const held = editsIn(root, turn)
  return "why" in held ? { refused: held.why } : held.rows
}

export function withoutRows(
  had: readonly FileChange[],
  rows: readonly FileChange[]
): readonly FileChange[] {
  const left = [...had]
  for (const one of rows) {
    const said = JSON.stringify(one)
    const at = left.findLastIndex((row) => JSON.stringify(row) === said)
    if (at >= 0) left.splice(at, 1)
  }
  return left
}

export function unkeptFromTurn(
  root: string,
  turn: string,
  rows: readonly FileChange[]
): string | null {
  if (rows.length === 0) return null
  const left = keptEdits(root, turn, (had) => withoutRows(had, rows))
  return "why" in left ? left.why : null
}

export function givenBack(
  root: string,
  agentId: string | null,
  turn: string,
  rows: readonly FileChange[]
): string | null {
  if (rows.length === 0) return null
  const page = callerPage(root, agentId)
  if (page === null) return PAGELESS
  const taken = unkeptFromTurn(root, turn, rows)
  if (taken !== null) return taken
  const into = appendEdits(root, page, rows)
  return "why" in into ? into.why : null
}

export function liftedFrom(
  turn: Paged,
  kept: readonly FileChange[],
  textOf: () => string
): Lifted | { readonly refused: string } {
  const own = kept.filter((one) => pathsOf(one).includes(turn.at))
  if (own.length === 0) return { values: {}, rest: kept }
  const played = replayed(stating(own), (path) => (path === turn.at ? textOf() : null))
  if ("refused" in played) {
    return { refused: `a recorder's kept edit no longer fits \`${turn.at}\`: ${played.refused}` }
  }
  const body = played.get(turn.at)
  const value = typeof body === "string" ? valueIn(body) : null
  if (value === null) return { refused: `the recorders' kept edits leave \`${turn.at}\` no page` }
  const values: Record<string, unknown> = {}
  for (const [key, one] of Object.entries(value)) {
    if (OWN_KEYS.includes(key)) continue
    if (JSON.stringify(one) !== JSON.stringify(turn.value[key])) values[key] = one
  }
  return { values, rest: kept.filter((one) => !own.includes(one)) }
}
