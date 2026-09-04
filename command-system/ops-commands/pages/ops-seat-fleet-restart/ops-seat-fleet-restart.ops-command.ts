import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsSeatFleetRestart = {
  id: "01a06904-5247-7505-8762-42f025024634",
  pageTypeSlug: "ops-command",
  slug: "ops-seat-fleet-restart",
  definition: "every seat whose client started before the settings standing now, cycled onto them.",
  opsPath: "seat fleet restart",
  opsEntryFile: "seat-system/seat-fleet-restart/seat-fleet-restart.module.code.ts",
  opsHelp: "txt",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat is stale by when its client started rather than by what its settings file holds now.",
    },
    {
      invariantKind: "departure",
      statement: "A seat already on the current settings is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The calling seat's own restart is queued on idle rather than taken at once.",
    },
  ],
} as const satisfies OpsCommand
