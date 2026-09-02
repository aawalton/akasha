import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelSolarWard = {
  id: "01a05fd0-1d7e-7de2-8ff7-e5b359b475a5",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-solar-ward",
  key: "isobel-solar-ward",
  title: "Solar Ward",
  icon: "/esoui/art/icons/ability_companion_templar_sun_shield.dds",
  description:
    "Your Companion summons the power of the sun to defend themselves from harm, reducing incoming damage by 20% and granting a damage shield that absorbs up to 12.5% of their Max Health for $$1 seconds.",
  companionId: "isobel",
  abilityId: 163442,
  skillLineId: "companion-isobel-brilliant-shield",
  skillType: "active",
  validRoles: ["tank"],
} as const satisfies TemperCompanionSkill
