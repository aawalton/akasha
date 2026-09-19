import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dirtySand = {
  id: "01a06575-9803-76af-90a8-8ae48b9c2165",
  type: "page-type/world-skill",
  slug: "dirty-sand",
  title: "Dirty Sand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
