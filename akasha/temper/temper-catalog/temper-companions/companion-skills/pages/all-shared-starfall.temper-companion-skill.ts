import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedStarfall = {
  id: "01a05fd0-1d73-7653-9992-95d24a15e7d4",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-starfall",
  key: "shared-starfall",
  title: "Starfall",
  icon: "/esoui/art/icons/ability_companion_mageguild_005.dds",
  description:
    "Your Companion calls a comet down from the constellations to blast an enemy, dealing $1 Flame Damage.",
  companionId: "all",
  abilityId: 155403,
  skillLineId: "guild-mages",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
