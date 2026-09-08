import type { SessionActivity } from "../session-activity.page-type.ts"

export const sleep = {
  id: "019f3489-4372-7157-8741-8d4a06049f32",
  pageTypeSlug: "session-activity",
  slug: "sleep",
  title: "Sleep",
  defaultDifficulty: 0,
  icon: "file-text",
  seq: 1,
} as const satisfies SessionActivity
