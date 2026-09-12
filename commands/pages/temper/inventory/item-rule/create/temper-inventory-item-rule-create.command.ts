import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleCreate = {
  id: "01a0603c-c1d2-7d8e-8802-6f8e11eb0f2f",
  type: "command",
  slug: "temper-inventory-item-rule-create",
  definition: "the command adding a per-item rule",
  code: "ts",
  taking: [
    { said: "--item-id <n>", takes: "the game item id the rule matches on" },
    {
      said: "--item-name <s>",
      takes: "the item's display name, where the id remains what it matches on",
    },
    { said: "--action <name>", takes: "what is done with the item when the rule fires" },
    { said: "--destination <d>", takes: "where the item goes, for the actions that move it" },
    { said: "--goal <s>", takes: "a goal label the web shows" },
    { said: "--active <true|false>", takes: "whether the rule is active" },
    { said: "--stock-quantity <n>", takes: "how many the destination is stocked up to" },
    {
      said: "--stock-scope <scope>",
      takes: "whether stocking counts one character or every character",
    },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A new per-item rule is inactive.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing the web alone shows reaches the addon.",
    },
  ],
  name: "create",
  arguments: [{ argument: "argument/title" }, { argument: "argument/notes" }],
} as const satisfies Command
