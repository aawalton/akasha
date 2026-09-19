import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const distractingShot = {
  id: "01a06575-9804-7015-ae9b-013f665642e8",
  type: "page-type/world-skill",
  slug: "distracting-shot",
  title: "Distracting Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
