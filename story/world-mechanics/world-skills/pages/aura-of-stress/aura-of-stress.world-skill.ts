import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const auraOfStress = {
  id: "01a06575-97ef-72e9-8382-cb213be712b1",
  type: "world-skill",
  slug: "aura-of-stress",
  title: "Aura of Stress",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
