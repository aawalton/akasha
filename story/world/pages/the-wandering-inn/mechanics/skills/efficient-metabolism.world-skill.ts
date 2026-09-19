import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const efficientMetabolism = {
  id: "01a06575-9807-7c5b-9a28-e146a28f108f",
  type: "page-type/world-skill",
  slug: "efficient-metabolism",
  title: "Efficient Metabolism",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
