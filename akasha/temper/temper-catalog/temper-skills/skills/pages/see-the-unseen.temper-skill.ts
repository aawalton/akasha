import type { TemperSkill } from "../temper-skill.page-type.ts"

export const seeTheUnseen = {
  id: "01a05fd1-7cb6-7bc3-b0ec-b9b566ead25c",
  pageTypeSlug: "temper-skill",
  slug: "see-the-unseen",
  title: "See the Unseen",
  key: "see-the-unseen",
  baseName: "See the Unseen",
  description:
    '"The insight you have gained from the Psijic Order grants you vision of the spiritual world. You can now interact with rifts all throughout Tamriel."',
  icon: "/esoui/art/icons/ability_psijic_007.dds",
  esoSkillId: 103793,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-psijic-order",
  skillType: "passive",
  subcategoryId: "guild-psijic-order",
  status: "unsupported",
} as const satisfies TemperSkill
