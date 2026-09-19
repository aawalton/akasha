import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aileronRoll = {
  id: "01a06575-97ea-7dd3-b59b-61746cddd5ff",
  type: "page-type/world-skill",
  slug: "aileron-roll",
  title: "Aileron Roll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
