const RUNG = 10

// THE RUNGS ARE WORKED OUT RATHER THAN WRITTEN OUT. The climb has no top, so a list written here
// would hold every attribute at the last rung that list reached from the day Alan passed that rung
// onward, and a level that has stopped climbing reads exactly like a level that was not earned.
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

// A LEVEL IS THE HIGHEST RUNG THE POINTS HAVE REACHED. Points short of the next rung are the climb
// toward that rung rather than the rung itself, so a level says what an attribute has earned rather
// than what that attribute is near.
export function levelOf(points: number): number {
  if (!Number.isFinite(points) || points <= 0) return 0
  let level = 0
  for (const rung of rungs()) {
    if (points < rung) break
    level += 1
  }
  return level
}
