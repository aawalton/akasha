import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flyingBoneClub = {
  id: "01a06572-95c4-7b4a-b412-e293d0abba01",
  type: "page-type/world-spell",
  slug: "flying-bone-club",
  title: "Flying Bone Club",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
