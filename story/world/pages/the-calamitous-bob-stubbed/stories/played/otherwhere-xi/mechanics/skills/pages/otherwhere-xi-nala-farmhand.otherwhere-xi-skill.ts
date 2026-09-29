import type { OtherwhereXiSkill } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/skills/otherwhere-xi-skill.page-type.types.ts"

export const otherwhereXiNalaFarmhand = {
  id: "01a0eaf9-0feb-7e88-af10-ae968bb2c093",
  type: "page-type/otherwhere-xi-skill",
  slug: "otherwhere-xi-nala-farmhand",
  title: "Farmhand",
  world: "world/the-calamitous-bob-stubbed",
  description: "The plain work of a hill steading: water, fodder, muck, fences and driving stock.",
  character: "character-player/otherwhere-xi-nala",
  rank: "Novice",
  level: 1,
} as const satisfies OtherwhereXiSkill
