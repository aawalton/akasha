import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const largerLivestock = {
  id: "01a06575-9821-774d-90f1-9748803a75ac",
  type: "page-type/world-skill",
  slug: "larger-livestock",
  title: "Larger Livestock",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
