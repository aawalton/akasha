import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const POSITION = "position"

const TURN_KEY = "turn"

const MECHANICS = "mechanics"

const HISTORY_TAIL = ".history.jsonl"

const PAGE_TAIL = ".ts"

const LINE_BREAK = "\n"

function turnIn(line: string): number | undefined {
  if (line.trim() === "") return undefined
  let parsed: unknown
  try {
    parsed = JSON.parse(line)
  } catch {
    return undefined
  }
  return isRecord(parsed) ? parseNumber(parsed[TURN_KEY]) : undefined
}

export function writtenIn(
  histories: Iterable<readonly [page: string, history: string]>,
  position: number
): readonly string[] {
  const found: string[] = []
  for (const [page, history] of histories) {
    if (history.split(LINE_BREAK).some((line) => turnIn(line) === position)) found.push(page)
  }
  return found.sort()
}

function historiesUnder(root: string, at: string): readonly (readonly [string, string])[] {
  const folder = join(root, at)
  if (!existsSync(folder)) return []
  return readdirSync(folder, { recursive: true, encoding: "utf8" })
    .filter((one) => one.endsWith(HISTORY_TAIL))
    .map((one) => {
      const page = join(at, `${one.slice(0, -HISTORY_TAIL.length)}${PAGE_TAIL}`)
      return [page, readFileSync(join(folder, one), "utf8")] as const
    })
}

export function writtenIndexed(
  root: string,
  turn: { readonly at: string; readonly value: Value }
): readonly string[] {
  const position = parseNumber(turn.value[POSITION])
  if (position === undefined) return []
  const mechanics = join(dirname(dirname(turn.at)), MECHANICS)
  return writtenIn(historiesUnder(root, mechanics), position)
}
