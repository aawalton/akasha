import type { WorldSpell } from "../../world-spell.page-type.ts"

export const waterUmbrella = {
  id: "01a06572-95e9-7e20-a0a4-d5162d604bc7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "water-umbrella",
  title: "Water Umbrella",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
