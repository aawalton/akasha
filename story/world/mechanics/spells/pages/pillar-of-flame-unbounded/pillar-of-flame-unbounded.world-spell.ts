import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pillarOfFlameUnbounded = {
  id: "01a06572-95da-78cf-8ff1-bc33e01f1ef1",
  type: "page-type/world-spell",
  slug: "pillar-of-flame-unbounded",
  title: "Pillar of Flame, Unbounded",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
