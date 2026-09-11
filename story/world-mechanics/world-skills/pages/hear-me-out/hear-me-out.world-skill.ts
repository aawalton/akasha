import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hearMeOut = {
  id: "01a06575-9819-7b81-bd2f-7474a2ea4376",
  type: "world-skill",
  slug: "hear-me-out",
  title: "Hear Me Out",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
