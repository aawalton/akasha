import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingEdit = {
  id: "01a06904-5253-74bf-8958-49b9e50becad",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-edit",
  definition: "changing a recorded session's fields, re-linking its day where the change moves it.",
  opsPath: "tracking edit",
  opsEntryFile: "tools/commands/tracking/edit.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
