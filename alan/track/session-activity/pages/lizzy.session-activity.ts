import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const lizzy = {
  id: "019fb7b4-84f7-7f19-b349-42b158cbdb14",
  type: "page-type/session-activity",
  slug: "lizzy",
  title: "Lizzy",
  defaultDifficulty: 2,
  icon: "file-text",
} as const satisfies SessionActivity
