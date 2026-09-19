import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveTactics = {
  id: "01a06575-9809-7d09-ade5-19e63c2b5f18",
  type: "page-type/world-skill",
  slug: "evasive-tactics",
  title: "Evasive Tactics",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
