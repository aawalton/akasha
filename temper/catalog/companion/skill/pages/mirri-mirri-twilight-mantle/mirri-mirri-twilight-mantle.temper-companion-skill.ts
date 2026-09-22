import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const mirriMirriTwilightMantle = {
  id: "019e6484-388e-7c29-977a-8a29e729a0e4",
  type: "page-type/temper-companion-skill",
  slug: "mirri-mirri-twilight-mantle",
  key: "mirri-twilight-mantle",
  title: "Twilight Mantle",
  icon: "/esoui/art/icons/ability_companion_nightblade_004.dds",
  description:
    "Your Companion shrouds themselves in refreshing shadows, healing for 25% of their Max Health and becoming invisible for $$2 seconds.",
  companionId: "temper-eso-companion/mirri",
  abilityId: 157201,
  skillLineId: "temper-companion-skill-line/companion-mirri-living-shade",
  skillType: "temper-skill-type/active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
