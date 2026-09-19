import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const counterMelody = {
  id: "01a06575-97fe-7478-a2a5-8d336bba8dae",
  type: "page-type/world-skill",
  slug: "counter-melody",
  title: "Counter Melody",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
