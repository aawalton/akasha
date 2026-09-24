import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  numberAt,
  slugOf,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SHARE = "cpuShare"

const RECLAIMED = "maxMemoryMb"

const ENDED = "killMemoryMb"

const MB_A_GB = 1024

function sizeOf(mb: number): string {
  return mb % MB_A_GB === 0 ? `${String(mb / MB_A_GB)}G` : `${String(mb)}M`
}

function lineOf(key: string, held: string | null): readonly string[] {
  return held === null ? [] : [`${key}=${held}`]
}

export function unitLimitLines(value: Value): readonly string[] {
  const share = numberAt(value, SHARE)
  const reclaimed = numberAt(value, RECLAIMED)
  const ended = numberAt(value, ENDED)
  return [
    ...lineOf("CPUWeight", share === null ? null : String(share)),
    ...lineOf("MemoryHigh", reclaimed === null ? null : sizeOf(reclaimed)),
    ...lineOf("MemoryMax", ended === null ? null : sizeOf(ended)),
  ]
}

export type Unit = { readonly type: string; readonly slug: string }

export function unitBodyIn(opening: readonly string[], section: string, value: Value): string {
  return `${[...opening, `[${section}]`, ...unitLimitLines(value)].join("\n")}\n`
}

export function unitBodyOf(
  given: string | Reading,
  unit: Unit,
  section: string,
  opening: readonly string[] = []
): string {
  return unitBodyIn(opening, section, valuedAt(given, slugOf(unit.type), unit.slug).value)
}
