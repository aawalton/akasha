import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonSkeletons = {
  id: "01a06572-95e4-7004-a7a0-d2e75588fb17",
  type: "world-spell",
  slug: "summon-skeletons",
  title: "Summon Skeletons",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
