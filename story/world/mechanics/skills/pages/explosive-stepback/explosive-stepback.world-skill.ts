import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const explosiveStepback = {
  id: "01a06575-980a-75fc-8934-bca6cdca9f6d",
  type: "page-type/world-skill",
  slug: "explosive-stepback",
  title: "Explosive Stepback",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
