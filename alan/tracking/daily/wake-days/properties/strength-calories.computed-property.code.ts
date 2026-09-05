import type { Work } from "@akasha/pages-system/computed-property"
import type { WakeDay } from "../wake-day.page-type.ts"

const PER_CALORIE = 7

export const work: Work<WakeDay, number> = (page) => {
  const volume = page.strengthVolume
  return volume === undefined ? null : volume / PER_CALORIE
}
