import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const boneWheel = {
  id: "01a06572-95b7-7622-a440-8fe701ebe2aa",
  type: "world-spell",
  slug: "bone-wheel",
  title: "Bone Wheel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
