import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceShieldWall = {
  id: "019e6f53-a981-7fc0-8bcc-9a9d6c557e72",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-shield-wall",
  title: "Vengeance Shield Wall",
  key: "vengeance-shield-wall",
  baseName: "Vengeance Shield Wall",
  description:
    '"Reinforce your shield, allowing you to automatically block all attacks at no cost for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_006.dds",
  esoSkillId: 240572,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-one-hand-and-shield",
  skillType: "ultimate",
  subcategoryId: "vengeance-weapon-one-hand-and-shield",
} as const satisfies TemperSkill
