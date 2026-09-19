import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfDisarming = {
  id: "01a06575-97ee-775b-9ee9-81a2e4c9a31a",
  type: "page-type/world-skill",
  slug: "aura-of-disarming",
  title: "Aura of Disarming",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
