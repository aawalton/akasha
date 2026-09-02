import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const stalwart = {
  id: "01a05fd1-d241-7099-913e-f950e2e13f9f",
  pageTypeSlug: "temper-skill",
  slug: "stalwart",
  title: "Stalwart",
  key: "stalwart",
  baseName: "Stalwart",
  description:
    '"Increases your Max Stamina by 1500.\\n\\nWhen you take damage, you gain 5 Ultimate.  This effect can occur once every 10 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 45298,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-nord-skills",
  skillType: "passive",
  subcategoryId: "racial-nord-skills",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
