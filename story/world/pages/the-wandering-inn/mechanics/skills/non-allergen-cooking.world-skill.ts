import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nonAllergenCooking = {
  id: "01a0657d-027b-70f1-86ae-b5ede3d73ca5",
  type: "page-type/world-skill",
  slug: "non-allergen-cooking",
  title: "Non-Allergen Cooking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
