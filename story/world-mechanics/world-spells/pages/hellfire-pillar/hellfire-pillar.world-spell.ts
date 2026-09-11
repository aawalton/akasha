import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hellfirePillar = {
  id: "01a06572-95c8-7a10-b729-f222b3584ec1",
  type: "world-spell",
  slug: "hellfire-pillar",
  title: "Hellfire Pillar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
