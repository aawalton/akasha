import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianCrushingClaws = {
  id: "01a05fd0-1d78-736f-ba8a-ee5825aef653",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-crushing-claws",
  key: "bastian-crushing-claws",
  title: "Crushing Claws",
  icon: "/esoui/art/icons/ability_companion_dragonknight_010.dds",
  description:
    "Your Companion calls forth talons from the ground, dealing $1 Flame Damage to enemies nearby and immobilizing them for $$2 seconds.",
  companionId: "bastian",
  abilityId: 153812,
  skillLineId: "companion-bastian-draconic-armor",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
