import type { SessionActivity } from "../session-activity.page-type.ts"

export const church = {
  id: "019f3489-4a04-72a3-a53f-d0e7a9b29973",
  pageTypeSlug: "session-activity",
  slug: "church",
  title: "Church",
  defaultDifficulty: 3,
  icon: "file-text",
  seq: 5,
} as const satisfies SessionActivity
