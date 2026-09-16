import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const ryan = {
  id: "019fb7b4-8398-77d2-9e1c-79364b7336a8",
  type: "page-type/session-activity",
  slug: "ryan",
  title: "Ryan",
  defaultDifficulty: 4,
  icon: "file-text",
} as const satisfies SessionActivity
