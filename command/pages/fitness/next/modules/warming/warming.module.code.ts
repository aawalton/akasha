import {
  MS_PER_DAY,
  parseDay,
} from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import {
  dayOf,
  type Movement,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { easedTo } from "akasha/command/pages/fitness/next/modules/kit-loading/kit-loading.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT = "setPerformedAt"

const ACTIVITY = "activityType"

const CARDIO = "cardio"

const BODY_ONLY = "body-only"

const MOBILITY = "mobility"

const STATIC = "static"

const MS_PER_MINUTE = 60_000

const SECONDS_PER_MINUTE = 60

export type Ramp = {
  readonly weight: number | null
  readonly reps: number
}

export type Raise = {
  readonly minutes: number
  readonly seconds: number
  readonly movements: readonly string[]
}

export type Warmup = {
  readonly raise: Raise | null
  readonly mobilise: readonly string[]
  readonly ramp: Ramp
}

export type Warmth = {
  readonly warm: boolean
  readonly ramped: ReadonlySet<string>
  readonly raised: ReadonlyMap<string, string>
  readonly turn: number
}

export type Warming = {
  readonly warm: boolean
  readonly ramped: boolean
  readonly raising: number
  readonly mobilising: number
  readonly share: number
  readonly reps: number
  readonly seconds: number
  readonly covered: ReadonlySet<string>
  readonly raised: ReadonlyMap<string, string>
  readonly turn: number
}

export function raisedIn(sets: readonly Value[]): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  for (const one of sets) {
    if (textAt(one, ACTIVITY) !== CARDIO) continue
    const named = slugAt(one, "exercise")
    const on = dayOf(one)
    if (named === null || on === null) continue
    const was = held.get(named)
    if (was === undefined || on > was) held.set(named, on)
  }
  return held
}

export function turnOf(day: string): number {
  const parsed = parseDay(day)
  if (parsed === null) return 0
  const [year, month, of] = parsed
  return Math.floor(Date.UTC(year, month - 1, of) / MS_PER_DAY)
}

export function warmthIn(sets: readonly Value[], now: Date, minutes: number, day: string): Warmth {
  const to = now.getTime()
  const from = to - minutes * MS_PER_MINUTE
  const ramped = new Set<string>()
  let warm = false
  for (const one of sets) {
    const at = textAt(one, AT)
    if (at === null) continue
    const held = Date.parse(at)
    if (!Number.isFinite(held) || held < from || held > to) continue
    warm = true
    const named = slugAt(one, "exercise")
    if (named !== null) ramped.add(named)
  }
  return { warm, ramped, raised: raisedIn(sets), turn: turnOf(day) }
}

export function movingIn(movements: ReadonlyMap<string, Movement>): readonly Movement[] {
  return [...movements.values()].filter(
    (one) => one.pattern === MOBILITY && one.force !== null && one.force !== STATIC
  )
}

export function mobilisingFor(
  movements: ReadonlyMap<string, Movement>,
  muscles: readonly string[],
  many: number
): readonly string[] {
  return movingIn(movements)
    .filter((one) => one.muscles.some((each) => muscles.includes(each)))
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .slice(0, many)
    .map((one) => one.title ?? one.slug)
}

export function raisingIn(
  movements: ReadonlyMap<string, Movement>,
  covered: ReadonlySet<string>
): readonly Movement[] {
  return [...movements.values()]
    .filter(
      (one) =>
        one.category === CARDIO &&
        (one.implement === null || one.implement === BODY_ONLY || covered.has(one.implement))
    )
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

function turnedBy(
  some: readonly Movement[],
  raised: ReadonlyMap<string, string>,
  turn: number
): readonly Movement[] {
  const on = (one: Movement): string => raised.get(one.slug) ?? ""
  const sorted = [...some].sort(
    (a, b) => on(a).localeCompare(on(b)) || a.slug.localeCompare(b.slug)
  )
  const head = sorted[0]
  if (head === undefined) return sorted
  const tied = sorted.filter((one) => on(one) === on(head)).length
  const at = ((turn % tied) + tied) % tied
  return [...sorted.slice(at, tied), ...sorted.slice(0, at), ...sorted.slice(tied)]
}

export function raisesIn(given: Warming): number {
  if (given.seconds <= 0) return 0
  return Math.max(1, Math.round((given.raising * SECONDS_PER_MINUTE) / given.seconds))
}

export function raisingFor(
  movements: ReadonlyMap<string, Movement>,
  muscles: readonly string[],
  given: Warming
): readonly string[] {
  const able = raisingIn(movements, given.covered)
  const fits = (one: Movement): boolean => one.muscles.some((each) => muscles.includes(each))
  return [
    ...turnedBy(able.filter(fits), given.raised, given.turn),
    ...turnedBy(
      able.filter((one) => !fits(one)),
      given.raised,
      given.turn
    ),
  ]
    .slice(0, raisesIn(given))
    .map((one) => one.title ?? one.slug)
}

export function warmupFor(
  one: Movement,
  working: number | null,
  loads: readonly number[],
  movements: ReadonlyMap<string, Movement>,
  given: Warming
): Warmup | null {
  if (given.warm && given.ramped) return null
  const ramp: Ramp = {
    weight: working === null ? null : easedTo(loads, working * given.share),
    reps: given.reps,
  }
  if (given.warm) return { raise: null, mobilise: [], ramp }
  return {
    raise: {
      minutes: given.raising,
      seconds: given.seconds,
      movements: raisingFor(movements, one.muscles, given),
    },
    mobilise: mobilisingFor(movements, one.muscles, given.mobilising),
    ramp,
  }
}

export function warmedOf(warmup: Warmup | null): readonly string[] {
  if (warmup === null) return []
  const said: string[] = []
  const raise = warmup.raise
  if (raise !== null) {
    const run = raise.movements.join(", ")
    said.push(
      raise.movements.length === 0
        ? `  raise: ${String(raise.minutes)} minutes easy, until you are breathing and damp`
        : `  raise: ${String(raise.seconds)} seconds each, easy — ${run}`
    )
  }
  if (warmup.mobilise.length > 0) said.push(`  mobilise: ${warmup.mobilise.join(", ")}`)
  const reps = `${String(warmup.ramp.reps)} easy reps`
  const weight = warmup.ramp.weight
  said.push(weight === null ? `  ramp: ${reps}` : `  ramp: ${String(weight)} lb, ${reps}`)
  return said
}
