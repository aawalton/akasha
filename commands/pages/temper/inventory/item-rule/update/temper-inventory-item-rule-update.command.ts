import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryItemRuleUpdate = {
  id: "01a0603c-c1d4-7ad6-becc-0e7bd28a0a09",
  type: "command",
  slug: "temper-inventory-item-rule-update",
  definition: "the command changing the fields of a per-item rule named by its id",
  code: "ts",
  taking: [
    { said: "<id>", takes: "the id of the per-item rule changed" },
    { said: "--action <name>", takes: "what is done with the item when the rule fires" },
    { said: "--destination <d>", takes: "where the item goes, for the actions that move it" },
    { said: "--notes <s>", takes: "a note the web shows" },
    { said: "--goal <s>", takes: "a goal label the web shows" },
    { said: "--active <true|false>", takes: "whether the rule is active" },
    { said: "--stock-quantity <n>", takes: "how many the destination is stocked up to" },
  ],
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
  ],
  name: "update",
  arguments: [{ argument: "argument/force" }, { argument: "argument/title" }],
} as const satisfies Command
