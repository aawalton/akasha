import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingLog = {
  id: "01a06904-5254-7fa7-b44a-9bea7621636b",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-log",
  definition: "writing one already-finished session from an explicit start and end.",
  opsPath: "tracking log",
  opsEntryFile: "tools/commands/tracking/log.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
