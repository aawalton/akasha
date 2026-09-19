import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flurryOfBlades = {
  id: "01a06575-980f-7020-9f88-11271ecfefd6",
  type: "page-type/world-skill",
  slug: "flurry-of-blades",
  title: "Flurry of Blades",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
