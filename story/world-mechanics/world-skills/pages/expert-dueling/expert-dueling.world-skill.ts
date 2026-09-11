import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const expertDueling = {
  id: "01a06575-980a-72a0-8a66-fbc4a654abf8",
  type: "world-skill",
  slug: "expert-dueling",
  title: "Expert Dueling",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
