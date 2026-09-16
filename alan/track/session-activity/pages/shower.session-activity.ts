import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const shower = {
  id: "019fe2ae-b8a7-736e-b616-9a5092b852df",
  type: "page-type/session-activity",
  slug: "shower",
  title: "Shower",
  defaultDifficulty: 1,
} as const satisfies SessionActivity
