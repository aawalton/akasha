import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const panacea = {
  id: "01a05fd1-2e0c-787e-8327-dd841bff3ef2",
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
