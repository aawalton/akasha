import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const mirriMirriSlayersBlade = {
  id: "019e6484-388c-785e-bf0a-bc50bb7c8b92",
  type: "page-type/temper-companion-skill",
  slug: "mirri-mirri-slayers-blade",
  key: "mirri-slayers-blade",
  title: "Slayer's Blade",
  icon: "/esoui/art/icons/ability_companion_nightblade_017.dds",
  description:
    "Your Companion thrusts a magic blade with lethal precision to finish off an enemy, dealing $1 Magic Damage.",
  companionId: "temper-eso-companion/mirri",
  abilityId: 153855,
  skillLineId: "temper-companion-skill-line/companion-mirri-deadly-assassin",
  skillType: "temper-skill-type/active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
  createdAt: "2026-05-26T13:40:47.372Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
