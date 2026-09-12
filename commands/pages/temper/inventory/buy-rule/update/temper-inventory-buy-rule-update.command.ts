import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryBuyRuleUpdate = {
  id: "01a0603c-c1d1-7778-bcb7-99cee8e25369",
  type: "command",
  slug: "temper-inventory-buy-rule-update",
  definition: "the command changing the fields of a buy rule named by its id",
  code: "ts",
  taking: [
    { said: "<id>", takes: "the id of the buy rule changed" },
    { said: "--target <n>", takes: "the total quantity to buy up to" },
    { said: "--source <name>", takes: "where the item is bought from" },
    { said: "--title <s>", takes: "a title the web shows" },
    { said: "--notes <s>", takes: "a note the web shows" },
    { said: "--goal <s>", takes: "a goal label the web shows" },
    { said: "--active <true|false>", takes: "whether the rule is active" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked buy rule is refused unless the call says `--force`.",
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
  arguments: [{ argument: "argument/force" }],
} as const satisfies Command
