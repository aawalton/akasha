import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBuyRuleUpdate = {
  id: "01a0603c-c1d1-7778-bcb7-99cee8e25369",
  type: "command",
  slug: "temper-inventory-buy-rule-update",
  definition: "the command changing the fields of a buy rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked buy rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no field to change is refused, naming the fields it changes.",
    },
    {
      invariantKind: "departure",
      statement: "A source no buy rule buys at is refused before the store is read at all.",
    },
    {
      invariantKind: "departure",
      statement: "The act that changes takes the store rather than reaching it.",
    },
    {
      invariantKind: "departure",
      statement: "A change is named on the caller's list as soon as that write has gone through.",
    },
    {
      invariantKind: "departure",
      statement: "A rule left unwritten is named nowhere, whether refused or locked.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
    {
      invariantKind: "departure",
      statement: "An id no buy rule has refuses the call.",
    },
  ],
  name: "update",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/target-quantity" },
    { argument: "argument/title" },
    { argument: "argument/notes" },
    { argument: "argument/goal" },
    { argument: "argument/active" },
    { argument: "argument/source" },
    { argument: "argument/buy-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
