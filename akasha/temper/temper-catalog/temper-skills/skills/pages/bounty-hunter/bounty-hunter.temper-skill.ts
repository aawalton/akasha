import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bountyHunter = {
  id: "019e6238-c29e-715a-b1c9-1452572e3902",
  pageTypeSlug: "temper-skill",
  slug: "bounty-hunter",
  title: "Bounty Hunter",
  key: "bounty-hunter",
  baseName: "Bounty Hunter",
  description: '"Allows you to accept bounty quests from the Fighters Guild in Cyrodiil."',
  icon: "/esoui/art/icons/ability_armor_011.dds",
  esoSkillId: 35804,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "passive",
  subcategoryId: "guild-fighters-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
