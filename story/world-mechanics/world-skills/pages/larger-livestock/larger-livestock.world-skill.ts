import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const largerLivestock = {
  id: "01a06575-9821-774d-90f1-9748803a75ac",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "larger-livestock",
  title: "Larger Livestock",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
