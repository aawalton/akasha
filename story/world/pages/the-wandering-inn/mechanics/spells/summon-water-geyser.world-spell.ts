import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonWaterGeyser = {
  id: "01a06572-95e4-7439-9b75-11c75087e94a",
  type: "page-type/world-spell",
  slug: "summon-water-geyser",
  title: "Summon Water Geyser",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
