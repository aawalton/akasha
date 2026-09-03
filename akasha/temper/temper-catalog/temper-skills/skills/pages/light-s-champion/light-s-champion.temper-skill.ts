import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightSChampion = {
  id: "019e6f53-a3f4-71b9-8396-763024a2ac83",
  pageTypeSlug: "temper-skill",
  slug: "light-s-champion",
  title: "Light's Champion",
  key: "light-s-champion",
  baseName: "Panacea",
  description:
    '"Release the rejuvenating energies of your staff to swirl around you, healing you or a nearby ally for |cffffff9133|r Health every |cffffff1|r second for |cffffff5|r seconds.\\n\\nAny friendly target you heal gains Major Force for |cffffff8|r seconds, increasing their Critical Damage by |cffffff20|r%."',
  icon: "/esoui/art/icons/ability_restorationstaff_006_b.dds",
  esoSkillId: 85132,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 50,
  skillLineId: "weapon-restoration-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
