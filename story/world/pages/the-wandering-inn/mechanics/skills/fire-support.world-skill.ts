import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fireSupport = {
  id: "01a06575-980d-72c2-85e5-e62ad9259dd3",
  type: "page-type/world-skill",
  slug: "fire-support",
  title: "Fire Support",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
