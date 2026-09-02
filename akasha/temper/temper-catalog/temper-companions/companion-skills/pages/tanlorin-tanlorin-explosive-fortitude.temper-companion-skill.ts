import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinExplosiveFortitude = {
  id: "01a05fd0-1d85-76fa-b6fb-b0c9e1fe69d7",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-explosive-fortitude",
  key: "tanlorin-explosive-fortitude",
  title: "Explosive Fortitude",
  icon: "/esoui/art/icons/ability_companion_tanlorin_explosivefortitude.dds",
  description:
    "Your Companion's soul explodes outwards, dealing $1 Magic Damage around them. When they take damage, deal an additional $1 Magic Damage to nearby enemies. This effect can occur once every $$3 seconds over $$2 seconds.",
  companionId: "tanlorin",
  abilityId: 214948,
  skillLineId: "companion-tanlorin-empathic-fighter",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
