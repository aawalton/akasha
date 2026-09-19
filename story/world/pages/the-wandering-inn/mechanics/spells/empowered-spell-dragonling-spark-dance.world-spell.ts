import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const empoweredSpellDragonlingSparkDance = {
  id: "01a06572-95bf-7d59-ad6f-21bfc202a571",
  type: "page-type/world-spell",
  slug: "empowered-spell-dragonling-spark-dance",
  title: "Empowered Spell: Dragonling Spark Dance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
