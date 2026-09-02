import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBlessingOfProtection = {
  id: "01a05fd1-d28c-7863-b3ec-00907e970330",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-blessing-of-protection",
  title: "Vengeance Blessing of Protection",
  key: "vengeance-blessing-of-protection",
  baseName: "Vengeance Blessing of Protection",
  description:
    '"Slam your staff down to activate its blessings, healing up to 3 of you and your allies in front of you for |cffffff12048|r Health."',
  icon: "/esoui/art/icons/ability_restorationstaff_003.dds",
  esoSkillId: 246616,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-restoration-staff",
} as const satisfies TemperSkill
