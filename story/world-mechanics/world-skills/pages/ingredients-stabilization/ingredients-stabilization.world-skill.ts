import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ingredientsStabilization = {
  id: "01a06575-981e-728e-a618-d1616cba75bc",
  type: "world-skill",
  slug: "ingredients-stabilization",
  title: "Ingredients Stabilization",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
