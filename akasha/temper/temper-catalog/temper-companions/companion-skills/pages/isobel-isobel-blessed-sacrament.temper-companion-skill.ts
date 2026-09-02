import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelBlessedSacrament = {
  id: "01a05fd0-1d7d-7b10-a905-e78f5f90f8e4",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-blessed-sacrament",
  key: "isobel-blessed-sacrament",
  title: "Blessed Sacrament",
  icon: "/esoui/art/icons/ability_companion_templar_rushed_ceremony.dds",
  description:
    "Your Companion sends out a burst of soothing light, healing themselves or a nearby ally for $1 Health, and an additional $2 every 2 seconds for $$2 seconds as the light momentarily lingers.",
  companionId: "isobel",
  abilityId: 163614,
  skillLineId: "companion-isobel-healing-grace",
  skillType: "active",
  validRoles: ["healer", "tank"],
} as const satisfies TemperCompanionSkill
