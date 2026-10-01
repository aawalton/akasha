import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { wordsIn } from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"

const TYPE_KEY = "type"

const TURN_KEY = "turn"

const VALUE_KEY = "value"

const MAX_VALUE_KEY = "maxValue"

const HISTORY_KEY = "history"

const MAX = "Max"

const LINE_BREAK = "\n"

const LAST = -1

const BEFORE_LAST = -2

type Line = { readonly turn: number; readonly value: number }

type Pools = {
  readonly pools: Record<string, number>
  readonly delta: Record<string, number>
}

function lineIn(text: string): Line | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return null
  }
  if (!isRecord(parsed)) return null
  const turn = parseNumber(parsed[TURN_KEY])
  const value = parseNumber(parsed[VALUE_KEY])
  return turn === undefined || value === undefined ? null : { turn, value }
}

export function linesIn(held: unknown): readonly Line[] {
  if (typeof held !== "string") return []
  const lines: Line[] = []
  for (const text of held.split(LINE_BREAK)) {
    const line = text.trim() === "" ? null : lineIn(text)
    if (line !== null) lines.push(line)
  }
  return lines
}

export function changeIn(lines: readonly Line[], turn: number): number | undefined {
  const last = lines.at(LAST)
  const before = lines.at(BEFORE_LAST)
  if (last === undefined || before === undefined || last.turn !== turn) return undefined
  const change = last.value - before.value
  return change === 0 ? undefined : change
}

export function poolsIn(rows: readonly QueryRow[], turn: number): Pools {
  const pools: Record<string, number> = {}
  const delta: Record<string, number> = {}
  for (const row of rows) {
    const type = textIn(row.values[TYPE_KEY])
    const value = parseNumber(row.values[VALUE_KEY])
    if (type === null || value === undefined || wordsIn(row) !== null) continue
    pools[type] = value
    const most = parseNumber(row.values[MAX_VALUE_KEY])
    if (most !== undefined) pools[`${type}${MAX}`] = most
    const change = changeIn(linesIn(row.values[HISTORY_KEY]), turn)
    if (change !== undefined) delta[type] = change
  }
  return { pools, delta }
}
