import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

type Totalled = { readonly pointsTotal?: number }

const RUNG = 10

export function* rungs(): Generator<number> {
  let cost = 1
  let nextCost = 1
  let reached = 0
  for (;;) {
    reached += cost * RUNG
    yield reached
    const following = cost + nextCost
    cost = nextCost
    nextCost = following
  }
}

export function levelOf(points: number): number {
  if (!Number.isFinite(points) || points <= 0) return 0
  let level = 0
  for (const rung of rungs()) {
    if (points < rung) break
    level += 1
  }
  return level
}

export const work: Work<Totalled, number> = (page) =>
  typeof page.pointsTotal === "number" ? levelOf(page.pointsTotal) : 0
