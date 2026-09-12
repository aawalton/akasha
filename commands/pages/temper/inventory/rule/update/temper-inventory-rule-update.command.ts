import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryRuleUpdate = {
  id: "01a0603c-c1d9-7f77-bcad-d46ad5150baa",
  type: "command",
  slug: "temper-inventory-rule-update",
  definition: "the command changing the fields of a category rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked category rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no field to change is refused, naming the fields it changes.",
    },
    {
      invariantKind: "departure",
      statement: "A field value the rules carry no such name for is refused before any read.",
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
      statement: "A change that wrote and then threw names that write in its refusal.",
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
      statement: "An id no category rule carries refuses the call.",
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
    { argument: "argument/stock-scope" },
    { argument: "argument/category" },
    { argument: "argument/conditions" },
    { argument: "argument/category-rule-id", required: true, saidAs: "word" },
    { argument: "argument/destination-chain" },
  ],
} as const satisfies Command
