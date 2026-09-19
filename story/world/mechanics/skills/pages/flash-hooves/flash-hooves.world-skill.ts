import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashHooves = {
  id: "01a06575-980d-7426-ab17-774a01c5ff68",
  type: "page-type/world-skill",
  slug: "flash-hooves",
  title: "Flash Hooves",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
