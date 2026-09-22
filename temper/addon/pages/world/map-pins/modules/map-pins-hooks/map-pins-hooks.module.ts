import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsHooks = {
  id: "01a06062-57e1-753f-929c-209be8a9f748",
  type: "page-type/module",
  slug: "map-pins-hooks",
  definition: "the game's map filter panels and pin class reshaped as the add-on starts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each filter panel is given a scrolling child its controls hang from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panels are reshaped before any feature asks for a filter checkbox.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin whose layout asks for grayscale is drawn desaturated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clearing a pin's data restores that pin's saturation.",
    },
  ],
} as const satisfies Module
