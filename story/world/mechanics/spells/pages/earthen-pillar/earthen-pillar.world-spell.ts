import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenPillar = {
  id: "01a06572-95be-7ff5-bd5d-3ad221a561a9",
  type: "page-type/world-spell",
  slug: "earthen-pillar",
  title: "Earthen Pillar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
