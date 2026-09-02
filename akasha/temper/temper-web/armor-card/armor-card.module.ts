import type { Module } from "@akasha/code-system/module"

export const armorCard = {
  id: "01a0642d-9a17-7abb-8e55-5319438ebc16",
  pageTypeSlug: "module",
  slug: "armor-card",
  definition: "one armor slot: its set, trait, enchant, quality and weight, each pickable",
  code: "tsx",
} as const satisfies Module
