import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianKindle = {
  id: "019e6484-3850-76a5-a8ea-5590c3d81fe7",
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
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
