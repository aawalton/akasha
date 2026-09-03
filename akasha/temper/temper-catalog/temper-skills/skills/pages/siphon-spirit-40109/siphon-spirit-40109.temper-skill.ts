import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const siphonSpirit40109 = {
  id: "019e6f53-a727-71fc-a3af-d5366773b252",
  pageTypeSlug: "temper-skill",
  slug: "siphon-spirit-40109",
  title: "Siphon Spirit",
  key: "siphon-spirit-40109",
  baseName: "Force Siphon",
  description:
    '"Focus your staff\'s power to apply Minor Lifesteal to an enemy for |cffffff30|r seconds, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging them.\\n\\nAlso applies Minor Magickasteal to the enemy for |cffffff30|r seconds, causing you and your allies to restore |cffffff168|r Magicka every |cffffff1|r second when damaging them."',
  icon: "/esoui/art/icons/ability_restorationstaff_005_a.dds",
  esoSkillId: 40109,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 38,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
