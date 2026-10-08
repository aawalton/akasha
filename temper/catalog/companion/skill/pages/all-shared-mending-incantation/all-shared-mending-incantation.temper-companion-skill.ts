import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedMendingIncantation = {
  id: "019e668d-c558-7ef5-9029-06c6a047be67",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-mending-incantation",
  key: "shared-mending-incantation",
  title: "Mending Incantation",
  icon: "/esoui/art/icons/ability_companion_restorationstaff_003.dds",
  description:
    "Your Companion slams their staff down to activate its blessings, healing themselves and allies in front of them for $1 Health. The blessing also grants 7000 Spell and Physical Resistance for $$2 seconds.",
  abilityId: 153467,
  skillLineId: "temper-companion-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  validRoles: ["healer", "tank", "support"],
  tags: ["cone-aoe"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T23:10:27.672Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
