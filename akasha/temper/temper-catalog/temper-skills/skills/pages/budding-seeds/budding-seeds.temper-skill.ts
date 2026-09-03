import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const buddingSeeds = {
  id: "019e6245-a607-7d9d-a649-843bf0020d04",
  pageTypeSlug: "temper-skill",
  slug: "budding-seeds",
  title: "Budding Seeds",
  key: "budding-seeds",
  baseName: "Healing Seed",
  description:
    '"Summon a field of flowers which blooms after 6 seconds, healing you and allies in the area for 3485 Health.\\n\\nWhile the field grows, you and allies are healed for 410 Health every 1 second.  \\n\\nYou can activate this ability again to cause it to instantly bloom.\\n\\nAn ally within the field can activate the Harvest synergy, healing for 3372 Health over 5 seconds."',
  icon: "/esoui/art/icons/ability_warden_007_b.dds",
  esoSkillId: 93807,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
