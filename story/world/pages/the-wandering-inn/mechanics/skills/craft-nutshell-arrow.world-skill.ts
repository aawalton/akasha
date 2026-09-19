import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const craftNutshellArrow = {
  id: "01a06575-97fe-77c2-9a9c-e8542e378498",
  type: "page-type/world-skill",
  slug: "craft-nutshell-arrow",
  title: "Craft: Nutshell Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
