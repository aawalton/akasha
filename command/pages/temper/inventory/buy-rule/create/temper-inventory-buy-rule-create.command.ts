import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryBuyRuleCreate = {
  id: "01a0603c-c1cf-7f09-859a-70e4e6aaa5e3",
  type: "page-type/command",
  slug: "temper-inventory-buy-rule-create",
  definition: "the command adding a buy rule",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A new buy rule is inactive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule added inactive is answered with the call that would start it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A source no buy rule buys at is refused before the store is read at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The act that adds takes the store rather than reaching it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule added is named on the caller's list as soon as that write has gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule the store would not take is named nowhere, because nothing was written.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
  ],
  name: "create",
  arguments: [
    { argument: "argument/title" },
    { argument: "argument/notes" },
    { argument: "argument/goal" },
    { argument: "argument/active" },
    { argument: "argument/item-id", required: true },
    { argument: "argument/item-name", required: true },
    { argument: "argument/target-quantity", required: true },
    { argument: "argument/source" },
  ],
} as const satisfies Command
