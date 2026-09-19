import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfProtection = {
  id: "01a06575-97ef-7117-837f-b49b932a902b",
  type: "page-type/world-skill",
  slug: "aura-of-protection",
  title: "Aura of Protection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
