import type { SessionActivity } from "akasha/alan/track/session-activities/session-activity.page-type.types.ts"

export const bath = {
  id: "01a08e6b-21af-7def-828d-1b0c964b90ec",
  pageTypeSlug: "session-activity",
  type: "session-activity",
  slug: "bath",
  title: "Bath",
  defaultDifficulty: 1,
  icon: "droplet",
  seq: 46,
} as const satisfies SessionActivity
