import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const foeAppraisal = {
  id: "01a06575-980f-75f7-8d5c-9f452a11d489",
  type: "world-skill",
  slug: "foe-appraisal",
  title: "Foe Appraisal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
