import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const fortifiedShields = {
  id: "01a06575-9810-78eb-83d9-2cb446f512d4",
  type: "world-skill",
  slug: "fortified-shields",
  title: "Fortified Shields",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
