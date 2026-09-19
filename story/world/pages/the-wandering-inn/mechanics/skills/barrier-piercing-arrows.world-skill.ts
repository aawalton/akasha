import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barrierPiercingArrows = {
  id: "01a06575-97f3-74e3-aef1-3fa196003774",
  type: "page-type/world-skill",
  slug: "barrier-piercing-arrows",
  title: "Barrier-Piercing Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
