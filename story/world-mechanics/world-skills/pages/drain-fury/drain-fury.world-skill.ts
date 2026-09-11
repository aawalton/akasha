import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const drainFury = {
  id: "01a06575-9805-7a9b-a551-9552acbfd680",
  type: "world-skill",
  slug: "drain-fury",
  title: "Drain Fury",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
