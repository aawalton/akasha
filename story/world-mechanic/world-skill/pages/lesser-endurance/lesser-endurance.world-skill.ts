import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const lesserEndurance = {
  id: "01a06575-9822-7610-86a3-6250299212a0",
  type: "world-skill",
  slug: "lesser-endurance",
  title: "Lesser Endurance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
