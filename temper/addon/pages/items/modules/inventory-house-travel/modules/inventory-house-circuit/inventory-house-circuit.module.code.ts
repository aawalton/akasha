import type { HouseStop } from "akasha/temper/addon/pages/items/modules/inventory-house-stop/inventory-house-stop.module.code.ts"

export type CircuitStep =
  | {
      readonly kind: "port"
      readonly stop: HouseStop
      readonly number: number
      readonly total: number
    }
  | { readonly kind: "storage"; readonly stop: HouseStop }
  | { readonly kind: "repeat"; readonly stop: HouseStop }
  | { readonly kind: "done" }

export function surveyStops(
  owned: readonly number[],
  scanned: (collectibleId: number) => boolean
): HouseStop[] {
  return [...owned]
    .sort((one, two) => one - two)
    .filter((collectibleId) => !scanned(collectibleId))
    .map((collectibleId): HouseStop => ({ collectibleId, reason: { kind: "scan" } }))
}

export function startsAtStorage(stops: readonly HouseStop[], here: number | undefined): boolean {
  return stops.some((stop) => stop.collectibleId === here && stop.reason.kind === "storage")
}

export function circuitStep(
  stops: readonly HouseStop[],
  here: number | undefined,
  ported: readonly number[],
  passStorage: boolean
): CircuitStep {
  const ahead = stops.filter(
    (stop) => stop.collectibleId !== here && !(passStorage && stop.reason.kind === "storage")
  )
  const next = ahead[0]
  if (next === undefined) return { kind: "done" }
  if (next.reason.kind === "storage") return { kind: "storage", stop: next }
  if (ported.includes(next.collectibleId)) return { kind: "repeat", stop: next }
  let leg = 0
  for (const stop of ahead) {
    if (stop.reason.kind === "storage") break
    leg++
  }
  return { kind: "port", stop: next, number: ported.length + 1, total: ported.length + leg }
}
