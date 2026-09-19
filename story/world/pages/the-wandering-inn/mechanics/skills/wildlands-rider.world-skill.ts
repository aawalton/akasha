import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildlandsRider = {
  id: "01a0657d-032e-7076-801d-3cdc0bfcbb73",
  type: "page-type/world-skill",
  slug: "wildlands-rider",
  title: "Wildlands Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
