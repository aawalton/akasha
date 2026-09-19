import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashStrike = {
  id: "01a06575-980e-71cf-91d0-e2bf37dcc254",
  type: "page-type/world-skill",
  slug: "flash-strike",
  title: "Flash Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
