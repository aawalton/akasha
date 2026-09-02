import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resourceful = {
  id: "01a05fd1-7c91-7fd4-a888-58cd48b84609",
  pageTypeSlug: "temper-skill",
  slug: "resourceful",
  title: "Resourceful",
  key: "resourceful",
  baseName: "Resourceful",
  description:
    '"Increases your Max Magicka and Max Stamina by 1000.\\n\\nWhen you drink a potion, you restore 3125 Health, Magicka, and Stamina."',
  icon: "/esoui/art/icons/ability_templar_009.dds",
  esoSkillId: 45247,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-argonian-skills",
  skillType: "passive",
  subcategoryId: "racial-argonian-skills",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
