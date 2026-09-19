import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fearMeYourMortality = {
  id: "01a06575-980c-7eb8-b9fa-1d7dc262b33a",
  type: "page-type/world-skill",
  slug: "fear-me-your-mortality",
  title: "Fear Me, Your Mortality",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
