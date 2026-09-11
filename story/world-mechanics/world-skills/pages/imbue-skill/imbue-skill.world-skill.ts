import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const imbueSkill = {
  id: "01a06575-981c-7488-aea6-000de71df49d",
  type: "world-skill",
  slug: "imbue-skill",
  title: "Imbue Skill",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
