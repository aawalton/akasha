import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const expertSummoner31412 = {
  id: "019e6f53-a1ca-7918-8596-ed9a72a93c0c",
  pageTypeSlug: "temper-skill",
  slug: "expert-summoner-31412",
  title: "Expert Summoner",
  key: "expert-summoner-31412",
  baseName: "Expert Summoner",
  description:
    '"Increases your Magicka and Stamina by |cffffff2|r%.\\n\\nIncreases your Max Health |cffffff2|r% if you have a permanent pet active."',
  icon: "/esoui/art/icons/ability_sorcerer_019.dds",
  esoSkillId: 31412,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "passive",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
