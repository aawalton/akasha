import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const influentialWords = {
  id: "01a06575-981e-7e63-81eb-67ac0ec827a5",
  type: "page-type/world-skill",
  slug: "influential-words",
  title: "Influential Words",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
