import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const apistaBasicTraining = {
  id: "01a06575-97eb-744b-91ed-5de70d3eca53",
  type: "page-type/world-skill",
  slug: "apista-basic-training",
  title: "Apista: Basic Training",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
