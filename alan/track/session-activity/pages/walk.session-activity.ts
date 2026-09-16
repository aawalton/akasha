import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const walk = {
  id: "019f3489-485b-73f1-8595-db7750baedba",
  type: "page-type/session-activity",
  slug: "walk",
  title: "Walk",
  defaultDifficulty: 1,
  icon: "file-text",
} as const satisfies SessionActivity
