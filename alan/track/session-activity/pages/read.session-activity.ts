import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const read = {
  id: "019f3489-46d7-712f-83be-e5908e4e4756",
  type: "page-type/session-activity",
  slug: "read",
  title: "Read",
  defaultDifficulty: 1,
  icon: "file-text",
} as const satisfies SessionActivity
