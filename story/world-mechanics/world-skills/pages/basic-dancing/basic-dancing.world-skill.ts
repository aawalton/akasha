import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicDancing = {
  id: "01a06575-97f3-73c8-ae5d-07b697834077",
  type: "world-skill",
  slug: "basic-dancing",
  title: "Basic Dancing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
