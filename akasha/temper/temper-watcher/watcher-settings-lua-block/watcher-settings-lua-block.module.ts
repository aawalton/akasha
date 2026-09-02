import type { Module } from "@akasha/code-system/module"

export const watcherSettingsLuaBlock = {
  id: "01a06367-c4f5-7b19-af43-529bb67df9da",
  pageTypeSlug: "module",
  slug: "watcher-settings-lua-block",
  definition: "how one keyed block is replaced inside a saved-variables file the game wrote",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A block is found by the key written in brackets and quotes.",
    },
    {
      invariantKind: "departure",
      statement: "A block runs from its key to the brace closing the block.",
    },
    {
      invariantKind: "departure",
      statement: "Braces are counted so a nested block does not end the outer one.",
    },
    {
      invariantKind: "departure",
      statement: "A block already there is replaced in place rather than moved.",
    },
    {
      invariantKind: "departure",
      statement: "A key absent is inserted before the first sibling key found.",
    },
    {
      invariantKind: "departure",
      statement: "Siblings are tried in the order the caller named the siblings.",
    },
    {
      invariantKind: "departure",
      statement: "Content no anchor is found in is handed back unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The indent is taken from the key's own line where the key is there.",
    },
    {
      invariantKind: "departure",
      statement: "The indent falls back to the line of the first sibling found.",
    },
    {
      invariantKind: "departure",
      statement: "The indent falls back to twelve spaces where no line is found.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
