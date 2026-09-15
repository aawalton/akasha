import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const lanternBrightIllumination = {
  id: "01a06575-9821-76fa-bbe5-a9629a9fe9a5",
  type: "world-skill",
  slug: "lantern-bright-illumination",
  title: "Lantern: Bright Illumination",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
