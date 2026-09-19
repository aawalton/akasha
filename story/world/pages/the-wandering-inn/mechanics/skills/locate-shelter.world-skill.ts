import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const locateShelter = {
  id: "01a0657d-0240-7097-a6f4-204a5c6d2879",
  type: "page-type/world-skill",
  slug: "locate-shelter",
  title: "Locate Shelter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
