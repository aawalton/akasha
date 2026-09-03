import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingClose = {
  id: "01a06904-5251-7edf-964a-3e6f7c47f9e3",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-close",
  definition: "stamping the finish on the open session without opening another.",
  opsPath: "tracking close",
  opsEntryFile: "tools/commands/tracking/close.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
