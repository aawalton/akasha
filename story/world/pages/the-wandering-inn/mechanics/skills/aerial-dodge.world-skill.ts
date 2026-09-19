import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aerialDodge = {
  id: "01a06575-97ea-7e71-8c07-cff83e8117a8",
  type: "page-type/world-skill",
  slug: "aerial-dodge",
  title: "Aerial Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
