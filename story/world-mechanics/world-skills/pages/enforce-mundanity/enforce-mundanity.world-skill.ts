import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enforceMundanity = {
  id: "01a06575-9808-7a43-ae1a-fdfa9ee8cb5d",
  type: "world-skill",
  slug: "enforce-mundanity",
  title: "Enforce Mundanity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
