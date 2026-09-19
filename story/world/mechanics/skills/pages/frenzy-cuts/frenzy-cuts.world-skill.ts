import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const frenzyCuts = {
  id: "01a06575-9811-7baa-8434-7945a2d8320f",
  type: "page-type/world-skill",
  slug: "frenzy-cuts",
  title: "Frenzy Cuts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
