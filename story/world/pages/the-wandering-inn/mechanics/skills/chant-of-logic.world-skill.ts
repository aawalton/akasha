import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const chantOfLogic = {
  id: "01a06575-97fa-74e7-913e-f66f1440d2d8",
  type: "page-type/world-skill",
  slug: "chant-of-logic",
  title: "Chant of Logic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
