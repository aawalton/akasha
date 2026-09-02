import type { Module } from "@akasha/code-system/module"

export const mapPinsHooks = {
  id: "01a06062-57e1-753f-929c-209be8a9f748",
  pageTypeSlug: "module",
  slug: "map-pins-hooks",
  definition: "the game's map filter panels and pin class reshaped as the game loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each filter panel is given a scrolling child its controls hang from.",
    },
    {
      invariantKind: "departure",
      statement:
        "The panels are reshaped once the first addon that is not the game's own has loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A pin whose layout asks for grayscale is drawn desaturated.",
    },
    {
      invariantKind: "departure",
      statement: "Clearing a pin's data restores that pin's saturation.",
    },
  ],
} as const satisfies Module
