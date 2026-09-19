import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const implacableOrder = {
  id: "01a06575-981d-7885-8f09-663fe5c55785",
  type: "page-type/world-skill",
  slug: "implacable-order",
  title: "Implacable Order",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
