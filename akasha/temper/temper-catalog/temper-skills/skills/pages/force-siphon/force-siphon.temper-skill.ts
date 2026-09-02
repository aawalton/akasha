import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const forceSiphon = {
  id: "01a05fd0-dc93-7f2b-8610-0f96a7476ccb",
  pageTypeSlug: "temper-skill",
  slug: "force-siphon",
  title: "Force Siphon",
  key: "force-siphon",
  baseName: "Force Siphon",
  description:
    '"Focus your staff\'s power to apply Minor Lifesteal to an enemy for |cffffff24|r seconds, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging them."',
  icon: "/esoui/art/icons/ability_restorationstaff_005.dds",
  esoSkillId: 31531,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
