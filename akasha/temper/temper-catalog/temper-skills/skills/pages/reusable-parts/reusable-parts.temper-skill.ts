import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reusableParts = {
  id: "01a05fd1-7c96-7513-b440-3d2a01b3f97a",
  pageTypeSlug: "temper-skill",
  slug: "reusable-parts",
  title: "Reusable Parts",
  key: "reusable-parts",
  baseName: "Reusable Parts",
  description:
    '"When your Sacrificial Bones, Skeletal Mage, or Spirit Mender dies, the cost of your next Sacrificial Bones, Skeletal Mage, or Spirit Mender is reduced by 66%."',
  icon: "/esoui/art/icons/passive_necromancer_001.dds",
  esoSkillId: 116188,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-grave-lord",
  skillType: "passive",
  subcategoryId: "necromancer-grave-lord",
  status: "unsupported",
} as const satisfies TemperSkill
