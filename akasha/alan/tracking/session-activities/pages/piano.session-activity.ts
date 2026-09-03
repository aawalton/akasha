import type { SessionActivity } from "../session-activity.page-type.ts"

export const piano = {
  id: "019fb7b4-7ddd-7f10-a5df-cc66eb3eecfb",
  pageTypeSlug: "session-activity",
  slug: "piano",
  title: "Piano",
  defaultDifficulty: 3,
  icon: "file-text",
  seq: 34,
} as const satisfies SessionActivity
