import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const animalsBasicCommand = {
  id: "01a06575-97eb-7e09-8909-7b6b83e13582",
  type: "world-skill",
  slug: "animals-basic-command",
  title: "Animals: Basic Command",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
