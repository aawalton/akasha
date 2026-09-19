import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyRapidRegeneration = {
  id: "01a06575-97f7-7e93-a99e-b8cca2edf91a",
  type: "page-type/world-skill",
  slug: "body-rapid-regeneration",
  title: "Body: Rapid Regeneration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
