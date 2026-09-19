import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicalTutelageGrandMagus = {
  id: "01a0657d-0242-73bd-8bf4-8ebf6bf43555",
  type: "page-type/world-skill",
  slug: "magical-tutelage-grand-magus",
  title: "Magical Tutelage (Grand Magus)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
