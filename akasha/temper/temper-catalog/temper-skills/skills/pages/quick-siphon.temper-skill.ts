import type { TemperSkill } from "../temper-skill.page-type.ts"

export const quickSiphon = {
  id: "01a05fd1-2e23-734d-a7ef-0c7c85b1c9bf",
  pageTypeSlug: "temper-skill",
  slug: "quick-siphon",
  title: "Quick Siphon",
  key: "quick-siphon",
  baseName: "Force Siphon",
  description:
    '"Focus your staff\'s power to apply Minor Lifesteal to an enemy for 30 seconds, healing you and your allies for 600 Health every 1 second when damaging them.\\n\\nWhen you or an ally hits the target, they gain Minor Expedition, which increases their Movement Speed by 15% for 4 seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_005_b.dds",
  esoSkillId: 41239,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
