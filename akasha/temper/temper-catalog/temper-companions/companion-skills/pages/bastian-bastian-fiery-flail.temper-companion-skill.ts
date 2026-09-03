import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianFieryFlail = {
  id: "019e6484-384e-7e08-ba17-77fb370e009b",
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
