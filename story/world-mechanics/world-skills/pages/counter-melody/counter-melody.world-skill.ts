import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const counterMelody = {
  id: "01a06575-97fe-7478-a2a5-8d336bba8dae",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "counter-melody",
  title: "Counter Melody",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
