import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const incineratingRadiance = {
  id: "01a06575-981e-7712-b5bf-b0a901b1a83a",
  type: "page-type/world-skill",
  slug: "incinerating-radiance",
  title: "Incinerating Radiance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
