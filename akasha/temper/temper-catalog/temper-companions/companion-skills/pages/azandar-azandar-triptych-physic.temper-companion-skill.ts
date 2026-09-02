import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarTriptychPhysic = {
  id: "01a05fd0-1d76-73a8-b633-e4a94586979f",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-triptych-physic",
  key: "azandar-triptych-physic",
  title: "Triptych Physic",
  icon: "/esoui/art/icons/ability_companion_arcanist_runemend.dds",
  description:
    "Your Companion launches a trio of restorative runes at themselves or an ally, healing for $1 Health three times.",
  companionId: "azandar",
  abilityId: 192574,
  skillLineId: "companion-azandar-revitalizing-researcher",
  skillType: "active",
  validRoles: ["healer", "tank"],
} as const satisfies TemperCompanionSkill
