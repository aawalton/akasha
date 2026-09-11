import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const groundElectricity = {
  id: "01a06575-9817-7ff7-b0cc-6238f0e5149a",
  type: "world-skill",
  slug: "ground-electricity",
  title: "Ground Electricity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
