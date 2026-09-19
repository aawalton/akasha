import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const berserkWave = {
  id: "01a06572-95b5-7fd5-b1ff-d9d8c76c205d",
  type: "page-type/world-spell",
  slug: "berserk-wave",
  title: "Berserk Wave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
