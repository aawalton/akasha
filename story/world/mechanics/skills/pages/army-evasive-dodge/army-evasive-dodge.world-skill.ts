import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armyEvasiveDodge = {
  id: "01a06575-97ed-73f8-925e-ef2398725db7",
  type: "page-type/world-skill",
  slug: "army-evasive-dodge",
  title: "Army: Evasive Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
