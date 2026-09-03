import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingStatus = {
  id: "01a06904-5259-7017-8050-4ca7decfdbe7",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-status",
  definition: "the open session and one day's finished blocks, read without writing.",
  opsPath: "tracking status",
  opsEntryFile: "tools/commands/tracking/status.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
