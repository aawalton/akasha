import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingSwitch = {
  id: "01a06904-525b-787f-a029-2d14798b2d08",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-switch",
  definition: "closing the open session and opening the next at one instant.",
  opsPath: "tracking switch",
  opsEntryFile: "tools/commands/tracking/switch.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
