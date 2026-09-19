import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bardSCharisma = {
  id: "01a06575-97f3-733e-908e-bff0a148827d",
  type: "page-type/world-skill",
  slug: "bard-s-charisma",
  title: "Bard’s Charisma",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
