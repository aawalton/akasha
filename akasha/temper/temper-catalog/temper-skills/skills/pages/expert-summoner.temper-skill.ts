import type { TemperSkill } from "../temper-skill.page-type.ts"

export const expertSummoner = {
  id: "01a05fd0-8e2c-76d0-bc50-5aa338b6b233",
  pageTypeSlug: "temper-skill",
  slug: "expert-summoner",
  title: "Expert Summoner",
  key: "expert-summoner",
  baseName: "Expert Summoner",
  description:
    '"Increases your Magicka and Stamina by 5%.\\n\\nIncreases your Max Health by 5% if you have a permanent pet active."',
  icon: "/esoui/art/icons/ability_sorcerer_019.dds",
  esoSkillId: 45199,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "passive",
  subcategoryId: "sorcerer-daedric-summoning",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
