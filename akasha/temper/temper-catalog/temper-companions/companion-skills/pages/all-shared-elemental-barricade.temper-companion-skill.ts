import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedElementalBarricade = {
  id: "01a05fd0-1d6c-7ca5-866f-66754dd1a88d",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-elemental-barricade",
  key: "shared-elemental-barricade",
  title: "Elemental Barricade",
  icon: "/esoui/art/icons/ability_companion_destructionstaff_002.dds",
  description:
    "Your Companion slams their staff down to create an elemental wall in front of them, dealing $1 Magic Damage over $$1 seconds.",
  companionId: "all",
  abilityId: 157140,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  validRoles: ["dps"],
  tags: ["ground-aoe"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
