import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hillOgreSSmash = {
  id: "01a06575-981a-7ec9-aed1-1a7d63a0ad3f",
  type: "page-type/world-skill",
  slug: "hill-ogre-s-smash",
  title: "Hill Ogre’s Smash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
