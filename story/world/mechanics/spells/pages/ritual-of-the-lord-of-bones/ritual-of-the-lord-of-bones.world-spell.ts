import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ritualOfTheLordOfBones = {
  id: "01a06572-95dd-71fd-b4fb-961655fde6b4",
  type: "page-type/world-spell",
  slug: "ritual-of-the-lord-of-bones",
  title: "Ritual of the Lord of Bones",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
