import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fencerSRiposte = {
  id: "01a06575-980c-7c4d-a0d9-56cf56b9e773",
  type: "world-skill",
  slug: "fencer-s-riposte",
  title: "Fencer’s Riposte",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
