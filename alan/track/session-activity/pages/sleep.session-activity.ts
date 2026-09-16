import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const sleep = {
  id: "019f3489-4372-7157-8741-8d4a06049f32",
  type: "page-type/session-activity",
  slug: "sleep",
  title: "Sleep",
  defaultDifficulty: 0,
  icon: "file-text",
} as const satisfies SessionActivity
