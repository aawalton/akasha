import type { SessionActivity } from "akasha/alan/track/session-activities/session-activity.page-type.types.ts"

export const projects = {
  id: "019f3489-4545-7798-ab7b-6743a20028a2",
  type: "session-activity",
  slug: "projects",
  title: "Projects",
  defaultDifficulty: 2,
  icon: "file-text",
  seq: 2,
} as const satisfies SessionActivity
