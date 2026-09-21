import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperLibTableFunctions = {
  id: "01a06052-2ca3-74ef-b59e-f8d49f0ca734",
  type: "page-type/temper-addon",
  slug: "temper-lib-table-functions",
  definition: "the table helpers every Temper addon in the game shares",

  addonManifest: "json",
  bundleEntry: "module/table-functions-entry",
  parts: [
    "module/table-function-casts",
    "module/table-function-types",
    "module/table-functions",
    "module/table-functions-entry",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A helper reads the table handed in and writes nothing back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A helper walking a table walks every table nested inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A helper handed no table answers about the value handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game reaches every helper through one global name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No helper here depends on another addon.",
    },
  ],
  library: true,
} as const satisfies TemperAddon
