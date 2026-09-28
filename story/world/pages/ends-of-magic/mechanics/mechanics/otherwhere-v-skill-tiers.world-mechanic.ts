import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSkillTiers = {
  id: "01a0e9ff-67f6-7744-9025-f70750292b24",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-skill-tiers",
  title: "Skill Tiers",
  world: "world/ends-of-magic",
  aliases: ["Low-tier", "Moderate-tier", "Mid-tier", "High-tier", "Unique"],
  description: "The grade of a Talent or skill, from Low-tier upward.",
} as const satisfies WorldMechanic
