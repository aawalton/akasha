import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryItemRuleCreate = {
  id: "01a0603c-c1d2-7d8e-8802-6f8e11eb0f2f",
  type: "command",
  slug: "temper-inventory-item-rule-create",
  definition: "the command adding a per-item rule",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A new per-item rule is inactive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A destination that is no destination is refused before the store is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The act that adds takes the store rather than reaching it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every flag is narrowed before the store is read, so a misspelling reads nothing.",
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
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--stock-scope` is taken here and refused, since an item rule carries no scope.",
    },
  ],
  name: "create",
  arguments: [
    { argument: "argument/title" },
    { argument: "argument/notes" },
    { argument: "argument/goal" },
    { argument: "argument/active" },
    { argument: "argument/action" },
    { argument: "argument/destination" },
    { argument: "argument/stock-scope" },
    { argument: "argument/item-id", required: true },
    { argument: "argument/item-name", required: true },
    { argument: "argument/stock-quantity" },
  ],
} as const satisfies Command
