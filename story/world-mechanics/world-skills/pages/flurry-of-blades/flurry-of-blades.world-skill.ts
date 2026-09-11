import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flurryOfBlades = {
  id: "01a06575-980f-7020-9f88-11271ecfefd6",
  type: "world-skill",
  slug: "flurry-of-blades",
  title: "Flurry of Blades",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
