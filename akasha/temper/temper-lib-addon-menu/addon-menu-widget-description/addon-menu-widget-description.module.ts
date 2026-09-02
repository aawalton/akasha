import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetDescription = {
  id: "01a06100-0000-7000-8000-000000000017",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-description",
  definition: "the block of body text, with an optional title above it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Links are inert unless the widget data enables those links.",
    },
    {
      invariantKind: "departure",
      statement: "A supplied link handler replaces the game's default link handling.",
    },
    {
      invariantKind: "constraint",
      statement: "The control grows to fit its text rather than holding a fixed height.",
    },
  ],
} as const satisfies Module
