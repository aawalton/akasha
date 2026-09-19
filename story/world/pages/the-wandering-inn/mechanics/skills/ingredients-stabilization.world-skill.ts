import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ingredientsStabilization = {
  id: "01a06575-981e-728e-a618-d1616cba75bc",
  type: "page-type/world-skill",
  slug: "ingredients-stabilization",
  title: "Ingredients Stabilization",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
