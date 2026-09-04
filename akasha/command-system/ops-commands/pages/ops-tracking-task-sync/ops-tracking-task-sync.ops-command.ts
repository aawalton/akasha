import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingTaskSync = {
  id: "01a06904-525c-72d0-b49a-3814b15582d0",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-task-sync",
  definition: "rewriting one day's task figure from the Health tasks completed in it.",
  opsPath: "tracking task-sync",
  opsEntryFile: "akasha/alan/tracking/daily/task-sync/task-sync.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
