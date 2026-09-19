import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seafoodCooking = {
  id: "01a0657d-02b8-74a4-aeb6-228791da209c",
  type: "page-type/world-skill",
  slug: "seafood-cooking",
  title: "Seafood Cooking",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["basic-cooking"],
  references: "jsonl",
} as const satisfies WorldSkill
