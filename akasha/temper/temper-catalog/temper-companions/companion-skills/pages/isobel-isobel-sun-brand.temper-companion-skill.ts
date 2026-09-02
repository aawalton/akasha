import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelSunBrand = {
  id: "01a05fd0-1d7f-7cd1-bf43-5cf7031e498a",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-sun-brand",
  key: "isobel-sun-brand",
  title: "Sun Brand",
  icon: "/esoui/art/icons/ability_companion_templar_sun_fire.dds",
  description:
    "Your Companion hurls a blazing ball of fire at an enemy, dealing $1 Flame Damage on impact and an additional $2 Flame Damage over $$2 seconds.",
  companionId: "isobel",
  abilityId: 163452,
  skillLineId: "companion-isobel-blazing-might",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
