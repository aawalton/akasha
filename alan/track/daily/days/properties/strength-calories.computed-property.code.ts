import type { Work } from "@akasha/pages/computed-property"
import type { Day } from "../day.page-type.types.ts"

const PER_CALORIE = 7

export const work: Work<Day, number> = (page) => {
  const volume = page.strengthVolume
  return volume === undefined ? null : volume / PER_CALORIE
}
