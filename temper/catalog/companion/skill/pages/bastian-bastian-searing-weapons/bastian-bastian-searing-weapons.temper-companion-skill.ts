import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const bastianBastianSearingWeapons = {
  id: "019e6484-3853-76d3-9ddd-c5d20b8300d2",
  type: "page-type/temper-companion-skill",
  slug: "bastian-bastian-searing-weapons",
  key: "bastian-searing-weapons",
  title: "Searing Weapons",
  icon: "/esoui/art/icons/ability_companion_dragonknight_015.dds",
  description:
    "Your Companion charges their weapons and their allies' weapons with volcanic power, increasing their damage done with Light and Heavy Attacks by 15% for $$1 seconds.",
  companionId: "temper-eso-companion/bastian",
  abilityId: 155355,
  skillLineId: "temper-companion-skill-line/companion-bastian-radiating-heart",
  skillType: "temper-skill-type/active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.315Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
