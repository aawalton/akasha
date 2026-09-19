import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfRevelations = {
  id: "01a06575-97ef-7dd9-bb8a-86333bc68364",
  type: "page-type/world-skill",
  slug: "aura-of-revelations",
  title: "Aura of Revelations",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
