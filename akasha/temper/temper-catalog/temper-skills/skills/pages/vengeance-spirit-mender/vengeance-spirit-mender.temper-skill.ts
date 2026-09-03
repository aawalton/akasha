import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSpiritMender = {
  id: "019e6f53-a990-7572-943d-6b3d2bb95cb4",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-spirit-mender",
  title: "Vengeance Spirit Mender",
  key: "vengeance-spirit-mender",
  baseName: "Vengeance Spirit Mender",
  description:
    '"Conjure a ghostly spirit to do your bidding and heal you or an ally for |cffffff24096|r Health over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_015.dds",
  esoSkillId: 238265,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-living-death",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-living-death",
} as const satisfies TemperSkill
