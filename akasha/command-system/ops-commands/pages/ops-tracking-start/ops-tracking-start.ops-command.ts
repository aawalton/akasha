import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingStart = {
  id: "01a06904-5258-71a8-86a1-ddb8bcea589c",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-start",
  definition: "opening a live session at an instant, refused while another is open.",
  opsPath: "tracking start",
  opsEntryFile: "tools/commands/tracking/start.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
