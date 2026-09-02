import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magickaController = {
  id: "01a05fd1-2df2-7858-b6c1-740a5366b545",
  pageTypeSlug: "temper-skill",
  slug: "magicka-controller",
  title: "Magicka Controller",
  key: "magicka-controller",
  baseName: "Magicka Controller",
  description:
    '"Increases your Max Magicka and Magicka Recovery by 2% for each Mages Guild ability slotted.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 45603,
  isMorph: false,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-mages-guild",
  skillType: "passive",
  subcategoryId: "guild-mages-guild",
  status: "supported",
} as const satisfies TemperSkill
