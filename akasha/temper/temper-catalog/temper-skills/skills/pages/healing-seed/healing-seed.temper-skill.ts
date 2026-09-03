import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingSeed = {
  id: "019e6f53-a2e2-752b-aa35-8c4aec629788",
  pageTypeSlug: "temper-skill",
  slug: "healing-seed",
  title: "Healing Seed",
  key: "healing-seed",
  baseName: "Healing Seed",
  description:
    '"Summon a field of flowers which blooms after |cffffff6|r seconds, healing you and allies in the area for |cffffff10960|r Health.\\n\\nAn ally within the field can activate the Harvest synergy, healing for |cffffff10602|r Health over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_warden_007.dds",
  esoSkillId: 85578,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
