import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsSeatStart = {
  id: "01a06904-524b-7cfb-b71c-493681e372b9",
  pageTypeSlug: "ops-command",
  slug: "ops-seat-start",
  definition: "a seat created under a name, with its process started here or left to the caller.",
  opsPath: "seat start",
  opsEntryFile: "akasha/seat-system/seat-start/seat-start.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
