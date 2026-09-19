import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ceaseFire = {
  id: "01a06575-97fa-7fab-8a43-92201ac46402",
  type: "page-type/world-skill",
  slug: "cease-fire",
  title: "Cease Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
