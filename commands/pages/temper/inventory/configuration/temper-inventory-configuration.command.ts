import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryConfiguration = {
  id: "01a0603c-c1d9-7bdc-8aab-dcc717f3de9b",
  type: "command",
  slug: "temper-inventory-configuration",
  definition: "the command giving back the compiled rule configuration the addon has",
  code: "ts",
  taking: [
    {
      said: "--section <section>",
      takes: "which section is given back: rules, consumables, priority or all",
    },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The configuration read is the compiled configuration.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no section gives back every section.",
    },
    {
      invariantKind: "departure",
      statement: "A section the configuration does not hold refuses the call.",
    },
  ],
  name: "configuration",
  arguments: [{ argument: "argument/json" }, { argument: "argument/inventory-path" }],
} as const satisfies Command
