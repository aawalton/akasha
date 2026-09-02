import type { Command } from "@akasha/command-system/command"

export const temperInventoryRuleUpdate = {
  id: "01a0603c-c1d9-7f77-bcad-d46ad5150baa",
  pageTypeSlug: "command",
  slug: "temper-inventory-rule-update",
  definition: "the command changing the fields of a category rule named by its id",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the id of the category rule changed" },
    { said: "--category <id>", takes: "the category of items the rule reaches" },
    { said: "--action <name>", takes: "what is done with an item the rule reaches" },
    {
      said: "--destination <destination>",
      takes: "where the item goes, for the actions that move it",
    },
    {
      said: "--destination-chain <json>",
      takes: "the cascade of destinations the item falls through",
    },
    { said: "--conditions <json>", takes: "the conditions narrowing which items the rule reaches" },
    { said: "--title <text>", takes: "a title the web shows" },
    { said: "--notes <text>", takes: "a note the web shows" },
    { said: "--goal <text>", takes: "a goal label the web shows" },
    { said: "--active <true|false>", takes: "whether the rule is active" },
    {
      said: "--stock-scope <scope>",
      takes: "whether stocking counts one character or every character",
    },
    { said: "--force", takes: "change it even where it is locked" },
  ],
  helpNotes: [
    "a locked category rule is refused rather than changed, unless `--force` is said.",
    "a field the call names nothing for is left as it was.",
    "a title, a note and a goal are held for the web alone and never reach the addon.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A locked category rule is refused unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "A field the call names nothing for is left as it was.",
    },
    {
      invariantKind: "departure",
      statement: "An id no category rule carries refuses the call.",
    },
  ],
} as const satisfies Command
