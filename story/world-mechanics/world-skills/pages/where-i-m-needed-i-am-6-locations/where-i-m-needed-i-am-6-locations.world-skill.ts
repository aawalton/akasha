import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const whereIMNeededIAm6Locations = {
  id: "01a0657d-032d-733f-a1e8-c0f9d5c02bd3",
  type: "world-skill",
  slug: "where-i-m-needed-i-am-6-locations",
  title: "Where I’m Needed, I Am (6 Locations)",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["never-late-to-work-bound-location"],
  references: "jsonl",
} as const satisfies WorldSkill
