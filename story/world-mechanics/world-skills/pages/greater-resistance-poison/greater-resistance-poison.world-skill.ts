import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greaterResistancePoison = {
  id: "01a06575-9817-7019-8900-da2766c4126a",
  type: "world-skill",
  slug: "greater-resistance-poison",
  title: "Greater Resistance: Poison",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
