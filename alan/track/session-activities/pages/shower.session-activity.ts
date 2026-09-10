import type { SessionActivity } from "../session-activity.page-type.types.ts"

export const shower = {
  id: "019fe2ae-b8a7-736e-b616-9a5092b852df",
  pageTypeSlug: "session-activity",
  type: "session-activity",
  slug: "shower",
  title: "Shower",
  defaultDifficulty: 1,
  seq: 42,
} as const satisfies SessionActivity
