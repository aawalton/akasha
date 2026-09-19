import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deeperCut = {
  id: "01a06575-9802-714f-9276-6494c63f3a57",
  type: "page-type/world-skill",
  slug: "deeper-cut",
  title: "Deeper Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
