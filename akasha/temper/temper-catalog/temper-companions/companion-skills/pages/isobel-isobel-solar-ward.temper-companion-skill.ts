import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelSolarWard = {
  id: "019e6484-3877-79d0-a571-cfa6b0027f14",
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
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
