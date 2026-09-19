import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const nightclouds = {
  id: "01a06572-95d9-74c9-9d3c-9ad81d851909",
  type: "page-type/world-spell",
  slug: "nightclouds",
  title: "Nightclouds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
