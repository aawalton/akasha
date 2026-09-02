import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinKindle = {
  id: "01a05fd0-1d86-7c1e-ad44-c321f9bb8ff3",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-kindle",
  key: "tanlorin-kindle",
  title: "Kindle",
  icon: "/esoui/art/icons/ability_companion_dragonknight_002_b.dds",
  description:
    "Your Companion launches a searing fireball at themselves or an ally to cauterize their wounds, healing for $1 Health.",
  companionId: "tanlorin",
  abilityId: 154925,
  skillLineId: "companion-tanlorin-radiating-heart",
  skillType: "active",
  validRoles: ["healer"],
} as const satisfies TemperCompanionSkill
