import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barbarousLoyalty = {
  id: "01a06575-97f3-77fe-b936-219c48707d74",
  type: "page-type/world-skill",
  slug: "barbarous-loyalty",
  title: "Barbarous Loyalty",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
