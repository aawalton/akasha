import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsSeatBoot = {
  id: "01a06904-5246-7cd4-89c8-873641be94cf",
  pageTypeSlug: "ops-command",
  slug: "ops-seat-boot",
  definition:
    "a seat's system prompt: who it is, and the one read that loads what its declarations bind it to.",
  opsPath: "seat boot",
  opsEntryFile: "tools/compose-boot.ts",
} as const satisfies OpsCommand
