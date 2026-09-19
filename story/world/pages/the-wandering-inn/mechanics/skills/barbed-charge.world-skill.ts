import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barbedCharge = {
  id: "01a06575-97f3-7150-b248-f995c9d7c176",
  type: "page-type/world-skill",
  slug: "barbed-charge",
  title: "Barbed Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
