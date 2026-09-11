import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greaterResistance = {
  id: "01a06575-9817-7f87-86e1-0b9820dfb029",
  type: "world-skill",
  slug: "greater-resistance",
  title: "Greater Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
