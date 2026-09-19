import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immunitySocialAwkwardness = {
  id: "01a06575-981d-70ff-8aac-53df236e67bd",
  type: "page-type/world-skill",
  slug: "immunity-social-awkwardness",
  title: "Immunity: Social Awkwardness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
