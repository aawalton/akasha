import type { SessionActivity } from "akasha/alan/track/session-activity/session-activity.page-type.types.ts"

export const eat = {
  id: "019fb7b4-8224-731c-834e-402b59e6a992",
  type: "page-type/session-activity",
  slug: "eat",
  title: "Eat",
  defaultDifficulty: 1,
  icon: "file-text",
} as const satisfies SessionActivity
