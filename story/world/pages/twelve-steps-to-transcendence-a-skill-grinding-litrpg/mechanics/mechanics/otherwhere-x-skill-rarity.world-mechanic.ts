import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXSkillRarity = {
  id: "01a0ea75-6dc4-73c1-8dce-5a23ff107d1d",
  type: "page-type/world-mechanic",
  slug: "otherwhere-x-skill-rarity",
  title: "Skill Rarity and Evolution",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "The grades the System gives skills, climbed by evolving them.",
} as const satisfies WorldMechanic
