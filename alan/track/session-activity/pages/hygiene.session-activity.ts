import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const hygiene = {
  id: "01a06818-a2ef-7e1a-a0d8-a2eb227166cb",
  type: "page-type/session-activity",
  slug: "hygiene",
  title: "Hygiene",
  defaultDifficulty: 1,
} as const satisfies SessionActivity
