import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedStarfall = {
  id: "019e6688-86f6-787b-878e-b7cf86af8bca",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-starfall",
  key: "shared-starfall",
  title: "Starfall",
  icon: "/esoui/art/icons/ability_companion_mageguild_005.dds",
  description:
    "Your Companion calls a comet down from the constellations to blast an enemy, dealing $1 Flame Damage.",
  abilityId: 155403,
  skillLineId: "temper-companion-skill-line/guild-mages",
  skillType: "temper-skill-type/active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
