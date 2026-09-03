import type { SessionActivity } from "../session-activity.page-type.ts"

export const walk = {
  id: "019f3489-485b-73f1-8595-db7750baedba",
  pageTypeSlug: "session-activity",
  slug: "walk",
  title: "Walk",
  defaultDifficulty: 1,
  icon: "file-text",
  seq: 4,
} as const satisfies SessionActivity
