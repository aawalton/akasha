import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterResistanceElectricity = {
  id: "01a06575-9817-7de2-82c7-6416d932574e",
  type: "page-type/world-skill",
  slug: "greater-resistance-electricity",
  title: "Greater Resistance: Electricity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
