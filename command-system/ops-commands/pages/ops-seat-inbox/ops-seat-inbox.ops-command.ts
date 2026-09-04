import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsSeatInbox = {
  id: "01a06904-5248-74e4-b4c0-9a90c4fa57f4",
  pageTypeSlug: "ops-command",
  slug: "ops-seat-inbox",
  definition:
    "the inbound messages addressed to one agent, marked read as they are listed unless --peek.",
  opsPath: "seat inbox",
  opsEntryFile: "seat-system/seat-inbox/seat-inbox.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
