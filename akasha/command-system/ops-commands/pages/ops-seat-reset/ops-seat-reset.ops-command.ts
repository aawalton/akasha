import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsSeatReset = {
  id: "01a06904-5249-7e07-aa59-7aa1253b5025",
  pageTypeSlug: "ops-command",
  slug: "ops-seat-reset",
  definition:
    "a new agent minted into a named seat, holding every declaration the one it replaces stated.",
  opsPath: "seat reset",
  opsEntryFile: "akasha/seat-system/seat-reset/seat-reset.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
