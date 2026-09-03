import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const panacea = {
  id: "019e6f53-a4de-791c-9c60-81dea6798c0f",
  pageTypeSlug: "temper-skill",
  slug: "panacea",
  title: "Panacea",
  key: "panacea",
  baseName: "Panacea",
  description:
    '"Release the rejuvenating energies of your staff to swirl around you, healing you or an ally for |cffffff9133|r Health every |cffffff1|r second for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_006.dds",
  esoSkillId: 83552,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "weapon-restoration-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
