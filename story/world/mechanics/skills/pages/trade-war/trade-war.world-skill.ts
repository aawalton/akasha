import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tradeWar = {
  id: "01a0657d-0316-7c79-9523-9b97cc502397",
  type: "page-type/world-skill",
  slug: "trade-war",
  title: "Trade War",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
