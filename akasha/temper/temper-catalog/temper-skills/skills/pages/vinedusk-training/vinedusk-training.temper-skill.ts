import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vineduskTraining = {
  id: "01a05fd2-1e92-70cf-8155-c735dbe1bcce",
  pageTypeSlug: "temper-skill",
  slug: "vinedusk-training",
  title: "Vinedusk Training",
  key: "vinedusk-training",
  baseName: "Vinedusk Training",
  description:
    '"Increases your damage done by 5% against enemies 15 meters or closer.\\n\\nIncreases your Critical Chance rating by 1314 against enemies further than 15 meters."',
  icon: "/esoui/art/icons/ability_weapon_025.dds",
  esoSkillId: 45494,
  isMorph: false,
  learnedLevel: 34,
  lineRankNeeded: 34,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-bow",
  skillType: "passive",
  subcategoryId: "weapon-bow",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
