import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinKindle = {
  id: "019e6484-38a7-75c3-a9af-75b71469f204",
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
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
