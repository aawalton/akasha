import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shieldWall = {
  id: "019e6f53-a6fa-7f5d-9172-c96f8cadac4f",
  pageTypeSlug: "temper-skill",
  slug: "shield-wall",
  title: "Shield Wall",
  key: "shield-wall",
  baseName: "Shield Wall",
  description:
    '"Reinforce your shield, allowing you to automatically block all attacks at no cost for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_006.dds",
  esoSkillId: 83272,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "ultimate",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
