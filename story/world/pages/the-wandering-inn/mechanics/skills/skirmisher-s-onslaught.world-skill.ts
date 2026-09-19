import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skirmisherSOnslaught = {
  id: "01a0657d-02c6-7b48-8902-ce29b0425ef8",
  type: "page-type/world-skill",
  slug: "skirmisher-s-onslaught",
  title: "Skirmisher’s Onslaught",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
