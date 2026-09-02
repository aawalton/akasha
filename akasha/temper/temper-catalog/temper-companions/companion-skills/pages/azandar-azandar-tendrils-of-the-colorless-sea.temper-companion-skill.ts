import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarTendrilsOfTheColorlessSea = {
  id: "01a05fd0-1d76-7241-aa91-39b90432c842",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-tendrils-of-the-colorless-sea",
  key: "azandar-tendrils-of-the-colorless-sea",
  title: "Tendrils of the Colorless Sea",
  icon: "/esoui/art/icons/ability_companion_arcanist_abyssalimpact.dds",
  description:
    "Your Companion infuses their arm with abyssal arcanum and thrusts forward, dealing $1 Physical Damage to enemies and applying Minor Vulnerability to them for $$2 seconds, increasing the damage they take by 5%.",
  companionId: "azandar",
  abilityId: 191293,
  skillLineId: "companion-azandar-scholar-of-apocrypha",
  skillType: "active",
  validRoles: ["dps", "support"],
} as const satisfies TemperCompanionSkill
