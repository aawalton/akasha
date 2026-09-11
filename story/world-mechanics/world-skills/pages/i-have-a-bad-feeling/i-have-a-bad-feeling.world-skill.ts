import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const iHaveABadFeeling = {
  id: "01a06575-981b-7a5b-890b-1d993a0d3102",
  type: "world-skill",
  slug: "i-have-a-bad-feeling",
  title: "I Have a Bad Feeling",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
