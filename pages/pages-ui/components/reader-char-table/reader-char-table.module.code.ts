import { clampFraction } from "../position-fraction/position-fraction.module.code.ts"

export interface ProseCharTable {
  readonly charStarts: readonly number[]
  readonly chars: readonly number[]
  readonly totalChars: number
}

export function buildProseCharTable(sources: readonly string[]): ProseCharTable {
  const charStarts: number[] = []
  const chars: number[] = []
  let cumulative = 0
  for (const source of sources) {
    charStarts.push(cumulative)
    chars.push(source.length)
    cumulative += source.length
  }
  return { charStarts, chars, totalChars: cumulative }
}

export function fractionForBlockPosition(
  table: ProseCharTable,
  blockIndex: number,
  intraFraction: number
): number {
  if (table.totalChars <= 0 || table.chars.length === 0) return 0
  const i = Math.max(0, Math.min(Math.trunc(blockIndex), table.chars.length - 1))
  const start = table.charStarts[i] ?? 0
  const size = table.chars[i] ?? 0
  const charPos = start + clampFraction(intraFraction) * size
  return clampFraction(charPos / table.totalChars)
}

export function blockPositionForFraction(
  table: ProseCharTable,
  fraction: number
): { readonly blockIndex: number; readonly intraFraction: number } {
  const n = table.chars.length
  if (n === 0) return { blockIndex: 0, intraFraction: 0 }
  const f = clampFraction(fraction)
  if (f >= 1) return { blockIndex: n - 1, intraFraction: 1 }
  const target = f * table.totalChars
  let lo = 0
  let hi = n - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if ((table.charStarts[mid] ?? 0) <= target) lo = mid
    else hi = mid - 1
  }
  const blockIndex = lo
  const start = table.charStarts[blockIndex] ?? 0
  const size = table.chars[blockIndex] ?? 0
  const intraFraction = size > 0 ? clampFraction((target - start) / size) : 0
  return { blockIndex, intraFraction }
}
