import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiSkillRanks = {
  id: "01a0ea77-acdc-776b-9c8f-0a4fefcb0954",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-skill-ranks",
  title: "Skill Ranks",
  world: "world/the-calamitous-bob-stubbed",
  description: "The named and numbered grades a skill climbs through.",
} as const satisfies WorldMechanic
