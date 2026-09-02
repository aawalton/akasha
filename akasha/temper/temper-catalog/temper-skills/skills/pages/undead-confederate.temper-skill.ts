import type { TemperSkill } from "../temper-skill.page-type.ts"

export const undeadConfederate = {
  id: "01a05fd1-d27a-7922-be78-45b8b04084da",
  pageTypeSlug: "temper-skill",
  slug: "undead-confederate",
  title: "Undead Confederate",
  key: "undead-confederate",
  baseName: "Undead Confederate",
  description:
    '"While you have a Sacrificial Bones, Skeletal Mage, or Spirit Mender active, your Health, Magicka, and Stamina Recovery is increased by 155."',
  icon: "/esoui/art/icons/passive_necromancer_012.dds",
  esoSkillId: 116283,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-living-death",
  skillType: "passive",
  subcategoryId: "necromancer-living-death",
  status: "unsupported",
} as const satisfies TemperSkill
