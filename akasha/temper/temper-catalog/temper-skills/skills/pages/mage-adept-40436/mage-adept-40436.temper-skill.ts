import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mageAdept40436 = {
  id: "01a05fd1-2df0-76ec-a424-23271656d0cd",
  pageTypeSlug: "temper-skill",
  slug: "mage-adept-40436",
  title: "Mage Adept",
  key: "mage-adept-40436",
  baseName: "Mage Adept",
  description:
    '"Reduces the Magicka and Health cost of your Mages Guild abilities by |cffffff8|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_045.dds",
  esoSkillId: 40436,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "guild-mages-guild",
  skillType: "passive",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
