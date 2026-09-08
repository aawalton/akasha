import type { SessionActivity } from "../session-activity.page-type.ts"

export const read = {
  id: "019f3489-46d7-712f-83be-e5908e4e4756",
  pageTypeSlug: "session-activity",
  slug: "read",
  title: "Read",
  defaultDifficulty: 1,
  icon: "file-text",
  seq: 3,
} as const satisfies SessionActivity
