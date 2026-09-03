import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedElementalBarricade = {
  id: "019e668d-c553-7e7c-819d-0fca148827c8",
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
