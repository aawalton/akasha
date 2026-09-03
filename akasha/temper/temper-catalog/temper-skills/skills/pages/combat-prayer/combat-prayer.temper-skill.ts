import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const combatPrayer = {
  id: "019e6226-00db-7ea7-beab-e07a6aa263c1",
  pageTypeSlug: "temper-skill",
  slug: "combat-prayer",
  title: "Combat Prayer",
  key: "combat-prayer",
  baseName: "Blessing of Protection",
  description:
    '"Slam your staff down to activate its blessings, healing you and your allies in front of you for 2614 Health.\\n\\nAlso grants Minor Berserk and Minor Resolve increasing you and your allies\' damage done by 5% and Physical Resistance and Spell Resistance by 2974 for 10 seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_003_b.dds",
  esoSkillId: 41189,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
