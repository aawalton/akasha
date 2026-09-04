import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingActivitySet = {
  id: "01a06904-524e-7a04-ad48-1ebc5bd0ba14",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-activity-set",
  definition: "the default difficulty a title rates at, written into the activity catalog.",
  opsPath: "tracking activity-set",
  opsEntryFile:
    "alan/tracking/session-activities/activity-default/activity-default.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
