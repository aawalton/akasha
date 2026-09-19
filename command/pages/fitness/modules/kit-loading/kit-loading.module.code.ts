import {
  slugsIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const KIT_TYPE = "fitness-equipment"

export type Kit = {
  readonly covers: readonly string[]
  readonly loads: readonly number[]
}

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

export function easedTo(loads: readonly number[], target: number): number | null {
  if (loads.length === 0) return null
  const under = loads.filter((one) => one <= target)
  return under.length === 0 ? Math.min(...loads) : Math.max(...under)
}
