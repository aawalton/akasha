import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unstableWallOfElements = {
  id: "01a05fd1-d280-7fba-af71-498fb703f05f",
  pageTypeSlug: "temper-skill",
  slug: "unstable-wall-of-elements",
  title: "Unstable Wall of Elements",
  key: "unstable-wall-of-elements",
  baseName: "Wall of Elements",
  description:
    '"Create an unstable elemental barrier in front of you, dealing 281 Magic Damage to enemies in the target area every 1 second before exploding for an additional 1199 Magic Damage.\\n\\nUnstable Wall of Fire deals additional damage to Burning enemies.\\n\\nUnstable Wall of Frost costs more, but snares and reduces armor against Chilled enemies and grants damage shields.\\n\\nUnstable Wall of Storms sets Concussed enemies Off Balance."',
  icon: "/esoui/art/icons/ability_destructionstaff_002b.dds",
  esoSkillId: 41711,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
