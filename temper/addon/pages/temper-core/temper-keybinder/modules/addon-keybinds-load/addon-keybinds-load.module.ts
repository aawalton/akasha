import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonKeybindsLoad = {
  id: "01a0605a-0518-7ae4-b056-c6b67b1c897b",
  type: "page-type/module",
  slug: "addon-keybinds-load",
  definition: "the menu split put in place once the game's own keybinding screen has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The split waits for the game's ingame addon alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait is dropped as soon as the split is in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's own keybindings entry is renamed to say standard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Category rows and keybind rows are hooked apart.",
    },
  ],
} as const satisfies Module
