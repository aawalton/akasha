import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianKindle = {
  id: "01a05fd0-1d79-7f60-9d51-2e785bad5842",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-kindle",
  key: "bastian-kindle",
  title: "Kindle",
  icon: "/esoui/art/icons/ability_companion_dragonknight_002_b.dds",
  description:
    "Your Companion launches a searing fireball at themselves or an ally to cauterize their wounds, healing for $1 Health.",
  companionId: "bastian",
  abilityId: 154925,
  skillLineId: "companion-bastian-radiating-heart",
  skillType: "active",
  validRoles: ["healer"],
} as const satisfies TemperCompanionSkill
