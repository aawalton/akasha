import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryVenueTrace = {
  id: "01a09b33-22e4-76f4-8c16-420d5f6923df",
  type: "page-type/command",
  slug: "temper-inventory-venue-trace",
  definition: "the command giving back a timing trace from one of the addon's vendor sessions",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ring read here holds every visit the addon traced that was not to a banker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying no visit reads the most recent trace.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A visit is counted back from the most recent, which is visit one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer names every visit kept by its time and the venue it was to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the addon has written no such visit into is told what would write one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A visit past the ones kept refuses the call.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No move, no phase and no paced dispatch is told, the addon recording none here.",
    },
  ],
  name: "venue-trace",
  arguments: [
    { argument: "argument/visit", default: "1" },
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
  ],
} as const satisfies Command
