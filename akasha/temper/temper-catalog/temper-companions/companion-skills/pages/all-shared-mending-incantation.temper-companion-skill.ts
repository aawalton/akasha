import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedMendingIncantation = {
  id: "01a05fd0-1d6d-7646-a8d8-a4210fb709e9",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-mending-incantation",
  key: "shared-mending-incantation",
  title: "Mending Incantation",
  icon: "/esoui/art/icons/ability_companion_restorationstaff_003.dds",
  description:
    "Your Companion slams their staff down to activate its blessings, healing themselves and allies in front of them for $1 Health. The blessing also grants 7000 Spell and Physical Resistance for $$2 seconds.",
  companionId: "all",
  abilityId: 153467,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  validRoles: ["healer", "tank", "support"],
  tags: ["cone-aoe"],
} as const satisfies TemperCompanionSkill
