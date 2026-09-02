import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const eternalGuardian = {
  id: "01a05fd0-8e25-798d-8751-69e230d18ba6",
  pageTypeSlug: "temper-skill",
  slug: "eternal-guardian",
  title: "Eternal Guardian",
  key: "eternal-guardian",
  baseName: "Feral Guardian",
  description:
    '"Rouse a grizzly to fight by your side. The grizzly swipes an enemy, dealing 599 Magic Damage, and sometimes swipes all enemies in front of it, dealing 2399 Magic Damage and stunning them for 2 seconds.\\n\\nOnce summoned you can activate Guardian\'s Wrath for 75 Ultimate, causing the grizzly to maul an enemy for 3360 Magic Damage. Deals 150% more damage to enemies below 25% Health.\\n\\n The grizzly respawns when killed, once per minute."',
  icon: "/esoui/art/icons/ability_warden_018_b.dds",
  esoSkillId: 85989,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-animal-companions",
  skillType: "ultimate",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
