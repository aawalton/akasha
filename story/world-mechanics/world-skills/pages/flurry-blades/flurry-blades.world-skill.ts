import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flurryBlades = {
  id: "01a06575-980f-71e1-b602-82e403252b11",
  type: "world-skill",
  slug: "flurry-blades",
  title: "Flurry Blades",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
