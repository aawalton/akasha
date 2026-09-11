import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boneWall = {
  id: "01a06572-95b7-7a97-8015-4db6afafdb60",
  type: "world-spell",
  slug: "bone-wall",
  title: "Bone Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
