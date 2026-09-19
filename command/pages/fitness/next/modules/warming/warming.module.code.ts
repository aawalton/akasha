import type { Movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { easedTo } from "akasha/command/pages/fitness/next/modules/kit-loading/kit-loading.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT = "setPerformedAt"

const MOBILITY = "mobility"

const STATIC = "static"

const MS_PER_MINUTE = 60_000

export type Ramp = {
  readonly weight: number | null
  readonly reps: number
}

export type Warmup = {
  readonly raise: number | null
  readonly mobilise: readonly string[]
  readonly ramp: Ramp
}

export type Warmth = {
  readonly warm: boolean
  readonly ramped: ReadonlySet<string>
}

export type Warming = {
  readonly warm: boolean
  readonly ramped: boolean
  readonly raising: number
  readonly mobilising: number
  readonly share: number
  readonly reps: number
}

export function warmthIn(sets: readonly Value[], now: Date, minutes: number): Warmth {
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
  return { warm, ramped }
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
    raise: given.raising,
    mobilise: mobilisingFor(movements, one.muscles, given.mobilising),
    ramp,
  }
}

export function warmedOf(warmup: Warmup | null): readonly string[] {
  if (warmup === null) return []
  const said: string[] = []
  if (warmup.raise !== null) {
    said.push(`  raise: ${String(warmup.raise)} minutes easy, until you are breathing and damp`)
  }
  if (warmup.mobilise.length > 0) said.push(`  mobilise: ${warmup.mobilise.join(", ")}`)
  const reps = `${String(warmup.ramp.reps)} easy reps`
  const weight = warmup.ramp.weight
  said.push(weight === null ? `  ramp: ${reps}` : `  ramp: ${String(weight)} lb, ${reps}`)
  return said
}
