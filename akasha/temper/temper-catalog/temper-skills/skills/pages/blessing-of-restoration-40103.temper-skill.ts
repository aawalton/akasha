import type { TemperSkill } from "../temper-skill.page-type.ts"

export const blessingOfRestoration40103 = {
  id: "01a05fd0-4367-79e3-8c53-d2490dfaad29",
  pageTypeSlug: "temper-skill",
  slug: "blessing-of-restoration-40103",
  title: "Blessing of Restoration",
  key: "blessing-of-restoration-40103",
  baseName: "Blessing of Protection",
  description:
    '"Slam your staff down to activate its blessings, healing you and your allies in front of you for |cffffff9339|r Health.\\n\\nAlso grants Minor Resolve, increasing you and your allies\' Physical Resistance and Spell Resistance by |cffffff2974|r for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_003_a.dds",
  esoSkillId: 40103,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 14,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
