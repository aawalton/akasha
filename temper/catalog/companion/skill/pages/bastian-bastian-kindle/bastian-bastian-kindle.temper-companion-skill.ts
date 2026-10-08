import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const bastianBastianKindle = {
  id: "019e6484-3850-76a5-a8ea-5590c3d81fe7",
  type: "page-type/temper-companion-skill",
  slug: "bastian-bastian-kindle",
  key: "bastian-kindle",
  title: "Kindle",
  icon: "/esoui/art/icons/ability_companion_dragonknight_002_b.dds",
  description:
    "Your Companion launches a searing fireball at themselves or an ally to cauterize their wounds, healing for $1 Health.",
  companionId: "temper-eso-companion/bastian",
  abilityId: 154925,
  skillLineId: "temper-companion-skill-line/companion-bastian-radiating-heart",
  skillType: "temper-skill-type/active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
  createdAt: "2026-05-26T13:40:47.312Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
