import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eyesOfMany = {
  id: "01a06575-980b-7e26-aafd-933a76b1a6ae",
  type: "page-type/world-skill",
  slug: "eyes-of-many",
  title: "Eyes of Many",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
