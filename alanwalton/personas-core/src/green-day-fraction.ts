import { resolveComputedProperties } from "@shared/pages-core/formula/resolve"
import { type ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import { type PropertyDefinition } from "@shared/pages-core/types"

export const POINTS_FIELD = "points"

export const GREEN_DAY_POINTS_FIELD = "greenDayPoints"

export const GREEN_DAY_FRACTION_FIELD = "greenDayFraction"

function finiteNumber(value: ReadonlyJSONValue | undefined): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

export function computeGreenDayFraction(
  attributes: Readonly<Record<string, ReadonlyJSONValue>>,
  definitions: readonly PropertyDefinition[]
): number {
  const resolved = resolveComputedProperties(attributes, definitions)
  const points = finiteNumber(resolved[POINTS_FIELD]) ?? 0
  const greenDayPoints = finiteNumber(resolved[GREEN_DAY_POINTS_FIELD]) ?? 0
  if (greenDayPoints <= 0) return 0
  const fraction = points / greenDayPoints
  return Number.isFinite(fraction) ? fraction : 0
}
