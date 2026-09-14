import { loadDayPlantGrams } from "akasha/alan/track/daily/modules/nutrition-grams/nutrition-grams.module.code.ts"
import {
  type WriteOutcome,
  writeNutritionPoints,
} from "akasha/alan/track/daily/modules/write-daily-points/write-daily-points.module.code.ts"

export async function rollupNutritionForDay(
  dayStr: string
): Promise<{ nutritionPoints: number; outcome: WriteOutcome }> {
  const nutritionPoints = await loadDayPlantGrams(dayStr)
  const outcome = await writeNutritionPoints(dayStr, nutritionPoints)
  return { nutritionPoints, outcome }
}
