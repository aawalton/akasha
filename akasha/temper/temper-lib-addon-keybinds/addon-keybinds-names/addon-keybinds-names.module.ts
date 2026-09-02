import type { Module } from "@akasha/code-system/module"

export const addonKeybindsNames = {
  id: "01a0605a-051b-734e-b19d-eae3f2271dc7",
  pageTypeSlug: "module",
  slug: "addon-keybinds-names",
  definition: "the global name, the version and the row type numbers the game's list uses",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global name is also the name the game event is registered under.",
    },
    {
      invariantKind: "departure",
      statement: "A row type number is taken from the game's own keybinding list.",
    },
  ],
} as const satisfies Module
