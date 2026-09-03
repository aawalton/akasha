import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dismember = {
  id: "019e6245-a65b-7c32-ad69-185ff2360626",
  pageTypeSlug: "temper-skill",
  slug: "dismember",
  title: "Dismember",
  key: "dismember",
  baseName: "Dismember",
  description:
    '"While a Grave Lord ability is active, your Spell and Physical Penetration are increased by 3271."',
  icon: "/esoui/art/icons/passive_necromancer_003.dds",
  esoSkillId: 116194,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-grave-lord",
  skillType: "passive",
  subcategoryId: "necromancer-grave-lord",
  status: "unsupported",
} as const satisfies TemperSkill
