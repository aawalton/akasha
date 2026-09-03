import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const timeFreeze = {
  id: "019e6238-c325-7d6f-81d9-89ed208e7935",
  pageTypeSlug: "temper-skill",
  slug: "time-freeze",
  title: "Time Freeze",
  key: "time-freeze",
  baseName: "Time Stop",
  description:
    '"Freeze the passage of time at the target location, gradually reducing the Movement Speed of enemies in the area over 4 seconds before finally stunning them in place for 3 seconds when the duration completes."',
  icon: "/esoui/art/icons/ability_psijic_002_b.dds",
  esoSkillId: 40104079,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
