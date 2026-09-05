import type { Work } from "@akasha/pages-system/computed-property"
import type { WorkedWakeDay } from "../wake-day.page-type.ts"

export const work: Work<WorkedWakeDay, string> = (page) => {
  const lights = [
    page.faithStoplight,
    page.loveStoplight,
    page.healthStoplight,
    page.learnStoplight,
    page.funStoplight,
    page.wealthStoplight,
  ]
  let text = ""
  for (const light of lights) {
    // A text literal answers absent where any light in it is absent.
    if (typeof light !== "string") return null
    text += light
  }
  return text
}
