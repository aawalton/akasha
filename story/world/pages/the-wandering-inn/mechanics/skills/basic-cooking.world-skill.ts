import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicCooking = {
  id: "01a06575-97f3-701a-a96e-7a82e6472a21",
  type: "page-type/world-skill",
  slug: "basic-cooking",
  title: "Basic Cooking",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["seafood-cooking"],
  references: "jsonl",
} as const satisfies WorldSkill
