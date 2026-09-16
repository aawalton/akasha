import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const drive = {
  id: "019fb7b4-7f5d-733d-9363-7b588935e658",
  type: "page-type/session-activity",
  slug: "drive",
  title: "Drive",
  defaultDifficulty: 2,
  icon: "file-text",
} as const satisfies SessionActivity
