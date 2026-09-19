import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const correctedSpelling = {
  id: "01a06575-97fe-7f54-a2d3-644b9cdacfe3",
  type: "page-type/world-skill",
  slug: "corrected-spelling",
  title: "Corrected Spelling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
