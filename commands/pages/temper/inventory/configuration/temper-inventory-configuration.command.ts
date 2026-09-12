import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryConfiguration = {
  id: "01a0603c-c1d9-7bdc-8aab-dcc717f3de9b",
  type: "command",
  slug: "temper-inventory-configuration",
  definition: "the command giving back the compiled rule configuration the addon has",
  code: "ts",
  test: "ts",
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
    {
      invariantKind: "departure",
      statement: "A rule whose record and configured rule disagree has that disagreement named.",
    },
    {
      invariantKind: "departure",
      statement: "The records going unread is said rather than answered as agreement.",
    },
  ],
  name: "configuration",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/section" },
  ],
} as const satisfies Command
