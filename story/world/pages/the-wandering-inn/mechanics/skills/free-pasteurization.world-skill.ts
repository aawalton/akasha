import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const freePasteurization = {
  id: "01a06575-9810-7803-865e-77ff06f55f45",
  type: "page-type/world-skill",
  slug: "free-pasteurization",
  title: "Free Pasteurization",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
