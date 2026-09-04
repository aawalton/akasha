import type { Row } from "../derive-shape/page-derive-shape.module.code.ts"
import type { PageQuery } from "../query-shape/page-query-shape.module.code.ts"

const NUMBER = "number"

export interface Reduced {
  readonly value: number | null
  readonly over: number | null
}

export const NOTHING: Reduced = { value: null, over: null }

export function reduced(
  rows: readonly Row[],
  query: PageQuery,
  typeOf: (key: string) => string | null
): Reduced {
  const how = query.function
  const target = query.target
  if (how === undefined || target === undefined) return NOTHING
  if (typeOf(target) !== NUMBER) return { value: null, over: 0 }
  const held: number[] = []
  for (const row of rows) {
    const one = row.values[target]
    if (typeof one !== "string") continue
    const value = Number(one)
    if (Number.isFinite(value)) held.push(value)
  }
  if (held.length === 0) return { value: null, over: 0 }
  const total = held.reduce((sum, one) => sum + one, 0)
  return { value: how === "sum" ? total : total / held.length, over: held.length }
}

export function reducedFault(
  query: PageQuery,
  typeOf: (key: string) => string | null
): readonly string[] {
  const target = query.target
  if (query.function === undefined || target === undefined) return []
  const type = typeOf(target)
  if (type === null) {
    return [
      `\`${target}\` is the property this query reduces and no property declares it on ` +
        `\`${query.pageType}\`, so a number here would have been reduced over nothing`,
    ]
  }
  if (type !== NUMBER) {
    return [
      `\`${target}\` is the property this query reduces and it is declared \`${type}\` rather ` +
        `than \`${NUMBER}\`, so there is nothing here to add up`,
    ]
  }
  return []
}
