import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsSeatTurnEndRead = {
  id: "01a06904-524d-79d6-a47c-e53cfaef82f4",
  pageTypeSlug: "ops-command",
  slug: "ops-seat-turn-end-read",
  definition:
    "one ended turn read by a model for whether its ending will annoy the seat's principal.",
  opsPath: "seat turn-end read",
  opsEntryFile:
    "akasha/seat-system/seat-turn/turn-end-read-command/turn-end-read-command.module.code.ts",
} as const satisfies OpsCommand
