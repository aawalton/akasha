import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetDescription = {
  id: "01a06100-0000-7000-8000-000000000017",
  type: "page-type/module",
  slug: "addon-menu-widget-description",
  definition: "the block of body text, with an optional title above it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Links are inert unless the widget data enables those links.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A supplied link handler replaces the game's default link handling.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The control grows to fit its text rather than holding a fixed height.",
    },
  ],
} as const satisfies Module
