import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterStrength = {
  id: "01a06575-9817-78a7-9f98-24a5362b4ce1",
  type: "page-type/world-skill",
  slug: "greater-strength",
  title: "Greater Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
