import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export function pointsIn(held: unknown): number {
  return typeof held === "number" && Number.isSafeInteger(held) ? held : 0
}

export function balanceOf(lines: readonly Value[]): number {
  return lines.reduce((sum, one) => sum + pointsIn(one.points), 0)
}
