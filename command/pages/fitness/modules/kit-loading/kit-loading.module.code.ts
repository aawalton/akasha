import { gym } from "akasha/alan/value/health/fitness/gym/gym.page-type.ts"
import { home } from "akasha/alan/value/health/fitness/gym/pages/home/home.gym.ts"
import { strengthExerciseImplement } from "akasha/alan/value/health/fitness/strength/exercise/implement/strength-exercise-implement.page-type.ts"
import { dayOf } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  slugAt,
  slugsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const KIT_TYPE = "fitness-equipment"

export const HOME: string = home.slug

export type Kit = {
  readonly covers: readonly string[]
  readonly loads: readonly number[]
}

export type Gym = {
  readonly slug: string
  readonly everyImplement: boolean
  readonly holds: readonly string[]
}

type Loading = { readonly gym: string; readonly kit: readonly Kit[] }

export function kitIn(pages: readonly Value[]): readonly Kit[] {
  const held: Kit[] = []
  for (const one of pages) {
    if (one.available !== true) continue
    const loads = Array.isArray(one.loads)
      ? one.loads.filter((each): each is number => typeof each === "number")
      : []
    held.push({ covers: slugsIn(one.covers), loads })
  }
  return held
}

export function coveredBy(kit: readonly Kit[]): ReadonlySet<string> {
  return new Set(kit.flatMap((one) => [...one.covers]))
}

export function loadsFor(kit: readonly Kit[], implement: string): readonly number[] {
  return kit.filter((one) => one.covers.includes(implement)).flatMap((one) => [...one.loads])
}

export function topLoadFor(kit: readonly Kit[], implement: string): number | null {
  const loads = loadsFor(kit, implement)
  return loads.length === 0 ? null : Math.max(...loads)
}

export function gymsIn(pages: readonly Value[]): ReadonlyMap<string, Gym> {
  const held = new Map<string, Gym>()
  for (const one of pages) {
    const slug = textAt(one, "slug")
    if (slug === null) continue
    held.set(slug, { slug, everyImplement: one.everyImplement === true, holds: slugsIn(one.holds) })
  }
  return held
}

export function gymOn(sets: readonly Value[], day: string): string {
  let latest: string | null = null
  let named = HOME
  for (const one of sets) {
    if (dayOf(one) !== day) continue
    const at = textAt(one, "setPerformedAt") ?? ""
    if (latest !== null && at < latest) continue
    latest = at
    named = slugAt(one, "gym") ?? HOME
  }
  return named
}

export function kitAt(
  at: Gym,
  pages: readonly Value[],
  implementsNamed: readonly string[]
): readonly Kit[] {
  if (at.everyImplement) return [{ covers: implementsNamed, loads: [] }]
  return kitIn(pages.filter((one) => at.holds.includes(textAt(one, "slug") ?? "")))
}

export function loadingIn(
  root: string,
  said: string | undefined,
  sets: readonly Value[],
  day: string
): Loading | string {
  const gyms = gymsIn(valuesOfType(root, gym.slug).map((one) => one.value))
  const named = said ?? gymOn(sets, day)
  const at = gyms.get(named)
  if (at === undefined)
    return `no gym is named \`${named}\` — the gyms are ${[...gyms.keys()].sort().join(", ")}`
  const implementsNamed = valuesOfType(root, strengthExerciseImplement.slug).flatMap((one) => {
    const slug = textAt(one.value, "slug")
    return slug === null ? [] : [slug]
  })
  const pages = valuesOfType(root, KIT_TYPE).map((one) => one.value)
  return { gym: named, kit: kitAt(at, pages, implementsNamed) }
}
