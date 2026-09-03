import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpSnowSquall = {
  id: "019e6484-389e-71fc-b216-44f4b4624626",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-snow-squall",
  key: "sharp-snow-squall",
  title: "Snow Squall",
  icon: "/esoui/art/icons/ability_companion_warden_arcticwind.dds",
  description:
    "Your Companion envelops themselves in winter winds, instantly healing for $1 Health and an additional $2 Health every 2 seconds over $$2 seconds. This ability scales off their Max Health.",
  companionId: "sharp-as-night",
  abilityId: 186605,
  skillLineId: "companion-sharp-as-night-winters-bite",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
