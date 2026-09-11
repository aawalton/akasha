import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const authorityDoors = {
  id: "01a06575-97f0-72f4-a9b0-8e5224c08ca1",
  type: "world-skill",
  slug: "authority-doors",
  title: "Authority: Doors",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
