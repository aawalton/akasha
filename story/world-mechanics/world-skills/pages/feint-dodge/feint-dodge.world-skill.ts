import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const feintDodge = {
  id: "01a06575-980c-7db5-8fef-32ca21d59f08",
  type: "world-skill",
  slug: "feint-dodge",
  title: "Feint Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
