import type { Module } from "@akasha/code-system/module"

export const addonKeybindsLoad = {
  id: "01a0605a-0518-7ae4-b056-c6b67b1c897b",
  pageTypeSlug: "module",
  slug: "addon-keybinds-load",
  definition: "the menu split put in place once the game's own keybinding screen has loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The split waits for the game's ingame addon alone.",
    },
    {
      invariantKind: "departure",
      statement: "The wait is dropped as soon as the split is in place.",
    },
    {
      invariantKind: "departure",
      statement: "The game's own keybindings entry is renamed to say standard.",
    },
    {
      invariantKind: "departure",
      statement: "Category rows and keybind rows are hooked apart.",
    },
  ],
} as const satisfies Module
