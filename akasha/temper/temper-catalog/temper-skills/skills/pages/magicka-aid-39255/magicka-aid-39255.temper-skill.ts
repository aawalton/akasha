import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magickaAid39255 = {
  id: "019e6f53-a436-7bc2-871d-fe3b70477257",
  pageTypeSlug: "temper-skill",
  slug: "magicka-aid-39255",
  title: "Magicka Aid",
  key: "magicka-aid-39255",
  baseName: "Magicka Aid",
  description:
    '"Increases your Magicka Recovery by |cffffff5|r% for each Support ability slotted.\\n\\nCurrent bonus: |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 39255,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "alliance-war-support",
  skillType: "passive",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
