import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shrewdOffering = {
  id: "01a05fd1-7cc1-72b9-a843-b97e6bc4d4df",
  pageTypeSlug: "temper-skill",
  slug: "shrewd-offering",
  title: "Shrewd Offering",
  key: "shrewd-offering",
  baseName: "Malevolent Offering",
  description:
    '"Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for 3485 Health, while draining 810 Health from yourself over 2 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_011_b.dds",
  esoSkillId: 36129,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
