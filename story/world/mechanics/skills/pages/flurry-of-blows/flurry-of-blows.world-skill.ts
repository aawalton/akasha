import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flurryOfBlows = {
  id: "01a06575-980f-7493-827a-396445f41510",
  type: "page-type/world-skill",
  slug: "flurry-of-blows",
  title: "Flurry of Blows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
