import {
  dayOf,
  type Movement,
  nearFailureIn,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import {
  numberAt,
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Mark = {
  readonly sets: number
  readonly weight: number | null
  readonly reps: number | null
  readonly bestOn: string | null
  readonly lastOn: string | null
  readonly staleBouts: number
  readonly turns: number
}

const NOTHING: Mark = {
  sets: 0,
  weight: null,
  reps: null,
  bestOn: null,
  lastOn: null,
  staleBouts: 0,
  turns: 0,
}

export function depthOf(mark: Mark | undefined): number {
  return (mark?.sets ?? 0) - (mark?.turns ?? 0)
}

export function turnsIn(
  pages: readonly Value[],
  before: string
): ReadonlyMap<string, readonly string[]> {
  const held = new Map<string, string[]>()
  for (const one of pages) {
    const on = textAt(one, "declineDate")
    const named = slugAt(one, "exercise")
    if (on === null || named === null || on > before) continue
    const was = held.get(named) ?? []
    was.push(on)
    held.set(named, was)
  }
  return held
}

function staledIn(
  held: ReadonlyMap<string, Mark>,
  days: ReadonlyMap<string, ReadonlySet<string>>,
  turns: ReadonlyMap<string, readonly string[]>
): ReadonlyMap<string, Mark> {
  const done = new Map<string, Mark>()
  for (const [slug, mark] of held) {
    const best = mark.bestOn
    const seen = [...(days.get(slug) ?? [])]
    const after = best === null ? 0 : seen.filter((one) => one > best).length
    done.set(slug, { ...mark, staleBouts: after, turns: (turns.get(slug) ?? []).length })
  }
  for (const [slug, said] of turns) {
    if (!done.has(slug)) done.set(slug, { ...NOTHING, turns: said.length })
  }
  return done
}

export function marksIn(
  sets: readonly Value[],
  nearFailure: number,
  before: string,
  turns: ReadonlyMap<string, readonly string[]> = new Map()
): ReadonlyMap<string, Mark> {
  const days = new Map<string, Set<string>>()
  const held = new Map<string, Mark>()
  for (const one of sets) {
    const on = dayOf(one)
    const named = slugAt(one, "exercise")
    if (on === null || named === null || on > before) continue
    if (!nearFailureIn(one, nearFailure)) continue
    const weight = numberAt(one, "weight")
    const reps = numberAt(one, "reps")
    const was = held.get(named) ?? NOTHING
    const heavier = (weight ?? 0) > (was.weight ?? 0)
    const sameWeight = (weight ?? 0) === (was.weight ?? 0)
    const better = was.bestOn === null || heavier || (sameWeight && (reps ?? 0) > (was.reps ?? 0))
    const seen = days.get(named) ?? new Set<string>()
    seen.add(on)
    days.set(named, seen)
    held.set(named, {
      sets: was.sets + 1,
      weight: better ? weight : was.weight,
      reps: better ? reps : was.reps,
      bestOn: better ? on : was.bestOn,
      lastOn: was.lastOn !== null && was.lastOn > on ? was.lastOn : on,
      staleBouts: 0,
      turns: 0,
    })
  }
  return staledIn(held, days, turns)
}

function movedOn(
  marks: ReadonlyMap<string, Mark>,
  movements: ReadonlyMap<string, Movement>,
  slug: string,
  pattern: string | null,
  since: string
): boolean {
  if (pattern === null) return false
  for (const [other, each] of marks) {
    if (other === slug || each.bestOn === null || each.bestOn <= since) continue
    if (movements.get(other)?.pattern === pattern) return true
  }
  return false
}

export function droppedIn(
  marks: ReadonlyMap<string, Mark>,
  movements: ReadonlyMap<string, Movement>,
  cap: number
): ReadonlySet<string> {
  const held = new Set<string>()
  for (const [slug, mark] of marks) {
    if (mark.staleBouts < cap || mark.lastOn === null) continue
    const pattern = movements.get(slug)?.pattern ?? null
    if (!movedOn(marks, movements, slug, pattern, mark.lastOn)) held.add(slug)
  }
  return held
}
