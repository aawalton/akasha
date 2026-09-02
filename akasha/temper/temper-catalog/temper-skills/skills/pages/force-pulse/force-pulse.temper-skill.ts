import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const forcePulse = {
  id: "01a05fd0-dc92-7b66-a707-130f11990366",
  pageTypeSlug: "temper-skill",
  slug: "force-pulse",
  title: "Force Pulse",
  key: "force-pulse",
  baseName: "Force Shock",
  description:
    '"Focus all the elemental energies with your staff and blast an enemy for 696 Flame Damage, 696 Frost Damage, and 696 Shock Damage. \\n\\nUp to 2 nearby enemies will take \\n2399 Magic Damage if they were already afflicted with a status effect."',
  icon: "/esoui/art/icons/ability_destructionstaff_001b.dds",
  esoSkillId: 48991,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
