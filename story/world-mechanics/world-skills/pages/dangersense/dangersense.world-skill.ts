import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dangersense = {
  id: "01a06575-9801-79cf-8499-fdc7b0a5ee5f",
  type: "world-skill",
  slug: "dangersense",
  title: "Dangersense",
  world: "the-wandering-inn",
  aliases: ["dangersenses"],
  references: "jsonl",
} as const satisfies WorldSkill
