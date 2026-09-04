import type { WorldSpell } from "../../world-spell.page-type.ts"

export const waterGeyser = {
  id: "01a06572-95e9-73f6-924c-1a5352fa0df8",
  pageTypeSlug: "world-spell",
  slug: "water-geyser",
  title: "Water Geyser",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
