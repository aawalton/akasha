import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dangersense = {
  id: "01a06575-9801-79cf-8499-fdc7b0a5ee5f",
  type: "page-type/world-skill",
  slug: "dangersense",
  title: "Dangersense",
  world: "world/the-wandering-inn",
  appearanceCount: 203,
  aliases: ["dangersenses"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.577Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
