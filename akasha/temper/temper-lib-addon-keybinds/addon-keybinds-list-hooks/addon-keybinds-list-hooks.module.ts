import type { Module } from "@akasha/code-system/module"

export const addonKeybindsListHooks = {
  id: "01a0605a-051a-7a69-a7a6-fba2eb79eefb",
  pageTypeSlug: "module",
  slug: "addon-keybinds-list-hooks",
  definition: "the game's keybinding list filtered by which half of the split is chosen",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game's own row setup runs before the callback fired for other addons.",
    },
    {
      invariantKind: "departure",
      statement: "A row type lacking a hide callback is given a hide callback.",
    },
    {
      invariantKind: "departure",
      statement: "A keybind is judged standard by the string id named for the action.",
    },
    {
      invariantKind: "departure",
      statement: "A header is held back until a row beneath that header is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A value read as a number is asked its Lua type first.",
    },
  ],
} as const satisfies Module
