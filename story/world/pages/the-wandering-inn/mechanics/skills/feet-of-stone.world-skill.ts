import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const feetOfStone = {
  id: "01a06575-980c-7e69-b6ee-bdc9e25cae73",
  type: "page-type/world-skill",
  slug: "feet-of-stone",
  title: "Feet of Stone",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
