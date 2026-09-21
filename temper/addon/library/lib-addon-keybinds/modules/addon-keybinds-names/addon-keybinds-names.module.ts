import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonKeybindsNames = {
  id: "01a0605a-051b-734e-b19d-eae3f2271dc7",
  type: "page-type/module",
  slug: "addon-keybinds-names",
  definition: "the global name, the version and the row type numbers the game's list uses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The global name is also the name the game event is registered under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row type number is taken from the game's own keybinding list.",
    },
  ],
} as const satisfies Module
