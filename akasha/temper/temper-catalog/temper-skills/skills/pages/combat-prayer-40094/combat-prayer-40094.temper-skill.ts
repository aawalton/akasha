import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const combatPrayer40094 = {
  id: "019e6f53-a007-74d7-9347-971e1d6155d0",
  pageTypeSlug: "temper-skill",
  slug: "combat-prayer-40094",
  title: "Combat Prayer",
  key: "combat-prayer-40094",
  baseName: "Blessing of Protection",
  description:
    '"Slam your staff down to activate its blessings, healing you and your allies in front of you for |cffffff8219|r Health.\\n\\nAlso grants Minor Berserk and Minor Resolve increasing you and your allies\' damage done by |cffffff5|r% and Physical Resistance and Spell Resistance by |cffffff2974|r for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_003_b.dds",
  esoSkillId: 40094,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 14,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
