import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryItemRuleDelete = {
  id: "01a0603c-c1d2-7862-9289-2b1f29d3c20e",
  type: "page-type/command",
  slug: "temper-inventory-item-rule-delete",
  definition: "the command taking away a per-item rule named by its id",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A locked per-item rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The id is said as a word and going on past the lock at its flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying no id is refused though it says to go on past the lock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag this takes none of is refused, naming both the ways this is said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Going on past the lock carries no value, so a value joined to it is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `--` makes even a flag this does take the id rather than that flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An id no per-item rule carries refuses the call.",
    },
  ],
  name: "delete",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/item-rule-id", required: true, saidAs: "word" },
  ],
} as const satisfies Command
