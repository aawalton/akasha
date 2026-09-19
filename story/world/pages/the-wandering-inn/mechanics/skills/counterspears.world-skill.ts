import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const counterspears = {
  id: "01a06575-97fe-75cd-922e-550985820bb1",
  type: "page-type/world-skill",
  slug: "counterspears",
  title: "Counterspears",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
