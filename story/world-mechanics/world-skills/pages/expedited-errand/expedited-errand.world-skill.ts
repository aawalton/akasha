import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const expeditedErrand = {
  id: "01a06575-980a-7159-9e59-81b7e130279a",
  type: "world-skill",
  slug: "expedited-errand",
  title: "Expedited Errand",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
