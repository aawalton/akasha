import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const zoneOfUhEnrichedMana = {
  id: "01a06572-95ea-749a-98d1-89aa4f1ae265",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "zone-of-uh-enriched-mana",
  title: "Zone of…uh…Enriched Mana",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
