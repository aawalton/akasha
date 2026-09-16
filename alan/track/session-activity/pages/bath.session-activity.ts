import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const bath = {
  id: "01a08e6b-21af-7def-828d-1b0c964b90ec",
  type: "page-type/session-activity",
  slug: "bath",
  title: "Bath",
  defaultDifficulty: 1,
  icon: "droplet",
} as const satisfies SessionActivity
