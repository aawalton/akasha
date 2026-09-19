import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const memoryOfTheEarth = {
  id: "01a0657d-024c-753f-9d1a-4c15fa5ea044",
  type: "page-type/world-skill",
  slug: "memory-of-the-earth",
  title: "Memory of the Earth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
