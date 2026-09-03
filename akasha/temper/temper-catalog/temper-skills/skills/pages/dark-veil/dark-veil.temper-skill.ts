import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkVeil = {
  id: "019e6245-a63e-7f58-a664-ade64bd6092d",
  pageTypeSlug: "temper-skill",
  slug: "dark-veil",
  title: "Dark Veil",
  key: "dark-veil",
  baseName: "Dark Veil",
  description:
    '"Increases the duration of your Shadow abilities by 2 seconds.\\n\\nDoes not apply to Shadow Cloak or its morphs."',
  icon: "/esoui/art/icons/ability_sorcerer_036.dds",
  esoSkillId: 45115,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-shadow",
  skillType: "passive",
  subcategoryId: "nightblade-shadow",
  status: "unsupported",
} as const satisfies TemperSkill
