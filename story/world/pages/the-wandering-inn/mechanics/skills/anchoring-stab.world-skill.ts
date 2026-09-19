import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const anchoringStab = {
  id: "01a06575-97eb-7641-9c28-e367630d4d18",
  type: "page-type/world-skill",
  slug: "anchoring-stab",
  title: "Anchoring Stab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
