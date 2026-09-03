import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingDelete = {
  id: "01a06904-5252-770f-ad05-6fb0c35846ec",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-delete",
  definition: "soft-deleting one session, so it leaves the day's totals and the status listing.",
  opsPath: "tracking delete",
  opsEntryFile: "tools/commands/tracking/delete.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
