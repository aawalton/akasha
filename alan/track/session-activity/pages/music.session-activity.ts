import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const music = {
  id: "01a06818-a2ef-7198-8048-7fde6418d562",
  type: "page-type/session-activity",
  slug: "music",
  title: "Music",
  defaultDifficulty: 0,
} as const satisfies SessionActivity
