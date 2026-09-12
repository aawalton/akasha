import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleUpdate = {
  id: "01a0603c-c1d4-7ad6-becc-0e7bd28a0a09",
  type: "command",
  slug: "temper-inventory-item-rule-update",
  definition: "the command changing the fields of a per-item rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked per-item rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
    {
      invariantKind: "departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no field to change is refused, naming the fields it changes.",
    },
    {
      invariantKind: "departure",
      statement: "A destination that is no destination is refused before the store is read.",
    },
    {
      invariantKind: "departure",
      statement: "The act that changes takes the store it writes through rather than reaching it.",
    },
    {
      invariantKind: "departure",
      statement: "A change is named on the caller's list as soon as that write has gone through.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule left unwritten is named nowhere, whether it was refused, locked or unfound.",
    },
  ],
  name: "update",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/title" },
    { argument: "argument/notes" },
    { argument: "argument/goal" },
    { argument: "argument/active" },
    { argument: "argument/action" },
    { argument: "argument/destination" },
    { argument: "argument/stock-quantity" },
    { argument: "argument/item-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
