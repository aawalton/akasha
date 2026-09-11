import type { Day } from "akasha/alan/track/daily/days/day.page-type.types.ts"
import type { StrengthCalories } from "akasha/alan/track/daily/days/properties/strength-calories.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

const PER_CALORIE = 7

export const work: Work<Day, StrengthCalories> = (page) => {
  const volume = page.strengthVolume
  return volume === undefined ? null : volume / PER_CALORIE
}
