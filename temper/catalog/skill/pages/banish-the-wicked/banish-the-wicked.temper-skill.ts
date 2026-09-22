import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const banishTheWicked = {
  id: "019e6238-c297-7420-a1fe-e54ba76e38ae",
  type: "page-type/temper-skill",
  slug: "banish-the-wicked",
  title: "Banish the Wicked",
  key: "banish-the-wicked",
  baseName: "Banish the Wicked",
  description: '"You generate 3 Ultimate whenever you kill an enemy."',
  icon: "/esoui/art/icons/ability_dragonknight_034.dds",
  esoSkillId: 45599,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
