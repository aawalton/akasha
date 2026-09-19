import {
  dayOf,
  type Movement,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import {
  slugAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const MOBILITY = "mobility"

const STATIC = "static"

const BODY_ONLY = "body-only"

export type Cooling = {
  readonly stretches: number
  readonly seconds: number
  readonly worked: readonly string[]
  readonly done: ReadonlySet<string>
  readonly covered: ReadonlySet<string>
}

export type Cool = {
  readonly movement: string
  readonly title: string
  readonly seconds: number
}

export function heldIn(
  movements: ReadonlyMap<string, Movement>,
  covered: ReadonlySet<string>
): readonly Movement[] {
  return [...movements.values()]
    .filter(
      (one) =>
        one.pattern === MOBILITY &&
        (one.force === null || one.force === STATIC) &&
        (one.implement === null || one.implement === BODY_ONLY || covered.has(one.implement))
    )
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

export function takenOn(sets: readonly Value[], day: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of sets) {
    if (dayOf(one) !== day) continue
    const named = slugAt(one, "exercise")
    if (named !== null) held.add(named)
  }
  return held
}

export function workedOn(
  sets: readonly Value[],
  day: string,
  movements: ReadonlyMap<string, Movement>
): readonly string[] {
  const held = new Set<string>()
  for (const named of takenOn(sets, day)) {
    const movement = movements.get(named)
    if (movement === undefined || movement.pattern === MOBILITY) continue
    for (const muscle of movement.muscles) held.add(muscle)
  }
  return [...held].sort()
}

export function coolingFor(
  movements: ReadonlyMap<string, Movement>,
  given: Cooling
): readonly Movement[] {
  const able = heldIn(movements, given.covered)
  const left = given.stretches - able.filter((one) => given.done.has(one.slug)).length
  if (left <= 0) return []
  const open = able.filter((one) => !given.done.has(one.slug))
  const fits = (one: Movement): boolean => one.muscles.some((each) => given.worked.includes(each))
  return [...open.filter(fits), ...open.filter((one) => !fits(one))].slice(0, left)
}

export function coolFor(movements: ReadonlyMap<string, Movement>, given: Cooling): Cool | null {
  const one = coolingFor(movements, given)[0]
  if (one === undefined) return null
  return { movement: one.slug, title: one.title ?? one.slug, seconds: given.seconds }
}

export function cooledOf(cool: Cool | null): readonly string[] {
  if (cool === null) return ["you are cooled down — go and eat something"]
  return [cool.title, `  hold ${String(cool.seconds)} seconds`]
}
