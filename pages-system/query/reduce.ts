import type { Value } from "../formula/formula.ts"
import type { Checked, Page } from "./query.ts"

export type How = "sum" | "mean"

export type Reduced = {
  readonly value: Value
  readonly over: number
}

export type Reduction = {
  readonly how: How
  readonly target: string
}

const NOTHING: Reduced = { value: { kind: "absent" }, over: 0 }

export const reducedFor = (
  pages: readonly Page[],
  targets: Iterable<string>,
  how: How
): Map<string, Reduced> => {
  const asked = new Set<string>()
  for (const one of targets) asked.add(one)
  const reduced = new Map<string, Reduced>()
  if (asked.size === 0) return reduced

  const running = new Map<string, { total: number; over: number }>()
  for (const one of asked) running.set(one, { total: 0, over: 0 })
  for (const page of pages) {
    for (const [key, mine] of running) {
      const held = page.values.properties[key]
      if (held === undefined || held.kind !== "number") continue
      mine.total += held.number
      mine.over += 1
    }
  }

  for (const [key, mine] of running) {
    if (mine.over === 0) {
      reduced.set(key, NOTHING)
      continue
    }
    const number = how === "sum" ? mine.total : mine.total / mine.over
    reduced.set(key, { value: { kind: "number", number }, over: mine.over })
  }
  return reduced
}

export const reducedOf = (pages: readonly Page[], target: string, how: How): Reduced =>
  reducedFor(pages, [target], how).get(target) ?? NOTHING

export const runReduction = (checked: Checked, pages: readonly Page[]): Reduced | null => {
  const reduction = checked.reduction
  if (reduction === null) return null
  return reducedOf(pages, reduction.target, reduction.how)
}
