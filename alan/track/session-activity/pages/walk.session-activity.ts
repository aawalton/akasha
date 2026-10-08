import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const walk = {
  id: "019f3489-485b-73f1-8595-db7750baedba",
  type: "page-type/session-activity",
  slug: "walk",
  title: "Walk",
  defaultDifficulty: 1,
  icon: "file-text",
  createdAt: "2026-07-05T23:07:20.027Z",
  updatedAt: "2026-09-16T14:19:27.000Z",
} as const satisfies SessionActivity
