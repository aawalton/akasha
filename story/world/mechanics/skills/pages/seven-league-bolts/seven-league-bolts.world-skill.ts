import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sevenLeagueBolts = {
  id: "01a0657d-02bf-7308-9990-62f5543668f2",
  type: "page-type/world-skill",
  slug: "seven-league-bolts",
  title: "Seven-League Bolts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
