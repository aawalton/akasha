import type { Command } from "@akasha/command-system/command"

export const temperInventoryRuleReorder = {
  id: "01a0603c-c1d8-70b7-a1e7-d602bcd411b0",
  pageTypeSlug: "command",
  slug: "temper-inventory-rule-reorder",
  definition: "the command moving a category rule to another place in the priority order",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the category rule moved" },
    { said: "--to <index>", takes: "the position the rule moves to" },
    { said: "--before <anchor-id>", takes: "the rule the moved rule comes before" },
    { said: "--after <anchor-id>", takes: "the rule the moved rule comes after" },
    { said: "--force", takes: "move it even where it is locked" },
  ],
  helpNotes: [
    "one of `--to`, `--before` and `--after` is said, and naming two is refused.",
    "the position is counted over the rules a person wrote rather than over the compiled order.",
    "an anchor id no rule carries is refused by that id.",
    "a locked rule is refused rather than moved, unless `--force` is said.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming more than one way of placing the rule is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The position is counted over the rules a person wrote.",
    },
    {
      invariantKind: "departure",
      statement: "An anchor id no rule carries refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A locked rule is refused unless the call says `--force`.",
    },
  ],
} as const satisfies Command
