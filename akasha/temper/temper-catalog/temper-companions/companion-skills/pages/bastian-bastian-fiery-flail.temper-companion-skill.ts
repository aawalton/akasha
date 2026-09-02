import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianFieryFlail = {
  id: "01a05fd0-1d78-7dc3-9711-2cd0a0474718",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-fiery-flail",
  key: "bastian-fiery-flail",
  title: "Fiery Flail",
  icon: "/esoui/art/icons/ability_companion_dragonknight_001.dds",
  description:
    "Your Companion lashes an enemy with flame, dealing $1 Flame Damage and setting them Off Balance for $$2 seconds.",
  companionId: "bastian",
  abilityId: 153687,
  skillLineId: "companion-bastian-ardent-warrior",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
