import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const impactShot = {
  id: "01a06575-981d-7c3e-9a56-9196c1ccf24c",
  type: "page-type/world-skill",
  slug: "impact-shot",
  title: "Impact Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
