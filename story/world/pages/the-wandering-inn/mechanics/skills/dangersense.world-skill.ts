import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dangersense = {
  id: "01a06575-9801-79cf-8499-fdc7b0a5ee5f",
  type: "page-type/world-skill",
  slug: "dangersense",
  title: "Dangersense",
  world: "world/the-wandering-inn",
  aliases: ["dangersenses"],
  references: "jsonl",
} as const satisfies WorldSkill
