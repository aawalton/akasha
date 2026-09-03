import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import { wakeDayWindow } from "@tools/lib/wake-day"
import { numberOf } from "../day-scan-window/day-scan-window.module.code.ts"

const FOOD_ENTRY_PAGE_TYPE_SLUG = "food-entry"

const HAPPENED_AT = "happenedAt"

const PLANT_GRAMS = "plantGrams"

export function sumPlantGrams(rows: readonly Readonly<Record<string, unknown>>[]): number {
  let total = 0
  for (const row of rows) total += numberOf(row[PLANT_GRAMS]) ?? 0
  return total
}

function checkoutRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

export async function loadDayPlantGrams(dayStr: string): Promise<number> {
  const window = wakeDayWindow(resolveRoots(), dayStr)
  const asked = asking(checkoutRoot(), {
    pageTypeSlug: FOOD_ENTRY_PAGE_TYPE_SLUG,
    where: { [HAPPENED_AT]: { "at-or-after": window.from, before: window.to } },
    keys: [PLANT_GRAMS],
  } as never)
  if ("refused" in asked) throw new Error(`loadDayPlantGrams: ${asked.refused}`)
  return sumPlantGrams(asked.rows)
}
