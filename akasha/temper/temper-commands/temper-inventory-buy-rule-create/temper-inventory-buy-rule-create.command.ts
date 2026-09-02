import type { Command } from "@akasha/command-system/command"

export const temperInventoryBuyRuleCreate = {
  id: "01a0603c-c1cf-7f09-859a-70e4e6aaa5e3",
  pageTypeSlug: "command",
  slug: "temper-inventory-buy-rule-create",
  definition: "the command adding a buy rule",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--item-id <n>", takes: "the game item id the rule matches on" },
    {
      said: "--item-name <s>",
      takes: "the item's display name, where the id remains what it matches on",
    },
    { said: "--target <n>", takes: "the total quantity to buy up to" },
    { said: "--source <name>", takes: "where the item is bought from" },
    { said: "--title <s>", takes: "a title the web shows" },
    { said: "--notes <s>", takes: "a note the web shows" },
    { said: "--goal <s>", takes: "a goal label the web shows" },
    { said: "--active <true|false>", takes: "whether the rule is active" },
  ],
  helpNotes: [
    "a new buy rule is inactive until it is activated.",
    "a title, a note and a goal are held for the web alone and never reach the addon.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A new buy rule is inactive.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
  ],
} as const satisfies Command
