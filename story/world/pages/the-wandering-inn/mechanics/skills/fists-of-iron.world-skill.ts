import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fistsOfIron = {
  id: "01a06575-980d-7acc-8845-668e4b4a3d46",
  type: "page-type/world-skill",
  slug: "fists-of-iron",
  title: "Fists of Iron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
