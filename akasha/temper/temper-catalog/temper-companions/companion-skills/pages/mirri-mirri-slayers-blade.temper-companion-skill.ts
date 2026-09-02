import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriSlayersBlade = {
  id: "01a05fd0-1d81-7dc5-a052-38263622b0aa",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-slayers-blade",
  key: "mirri-slayers-blade",
  title: "Slayer's Blade",
  icon: "/esoui/art/icons/ability_companion_nightblade_017.dds",
  description:
    "Your Companion thrusts a magic blade with lethal precision to finish off an enemy, dealing $1 Magic Damage.",
  companionId: "mirri",
  abilityId: 153855,
  skillLineId: "companion-mirri-deadly-assassin",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
