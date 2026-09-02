import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const clemency = {
  id: "01a05fd0-4398-757d-9867-0e08351e8244",
  pageTypeSlug: "temper-skill",
  slug: "clemency",
  title: "Clemency",
  key: "clemency",
  baseName: "Clemency",
  description:
    '"When a guard accosts you, you may use Clemency once per day. If used, the Guard will not arrest you or take your money and stolen goods. Additionally, Guards will not attempt to accost you for  1 minute after you use Clemency unless you commit other crimes."',
  icon: "/esoui/art/icons/ability_thievesguild_passive_002.dds",
  esoSkillId: 76451,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-thieves-guild",
  skillType: "passive",
  subcategoryId: "guild-thieves-guild",
  status: "unsupported",
} as const satisfies TemperSkill
