import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tribeFastTravellers = {
  id: "01a0657d-0316-7f39-bbc4-ebee95918e74",
  type: "page-type/world-skill",
  slug: "tribe-fast-travellers",
  title: "Tribe: Fast Travellers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
