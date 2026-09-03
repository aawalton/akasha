import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePanacea = {
  id: "019e6f53-a94c-7dfa-814f-6f7698478afe",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-panacea",
  title: "Vengeance Panacea",
  key: "vengeance-panacea",
  baseName: "Vengeance Panacea",
  description:
    '"Release the rejuvenating energies of your staff to swirl around you, healing up to 3 of you and your allies for |cffffff16065|r Health."',
  icon: "/esoui/art/icons/ability_restorationstaff_006.dds",
  esoSkillId: 241586,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-restoration-staff",
  skillType: "ultimate",
  subcategoryId: "vengeance-weapon-restoration-staff",
} as const satisfies TemperSkill
