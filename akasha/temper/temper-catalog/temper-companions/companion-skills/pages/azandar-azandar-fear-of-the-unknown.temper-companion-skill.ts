import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarFearOfTheUnknown = {
  id: "01a05fd0-1d75-7230-9089-4b2aac8457fe",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-fear-of-the-unknown",
  key: "azandar-fear-of-the-unknown",
  title: "Fear of the Unknown",
  icon: "/esoui/art/icons/ability_companion_arcanist_runeofeldritchhorror.dds",
  description:
    "Your Companion confronts an enemy with the unknowable truth of reality, applying Fear to them for $$1 seconds.",
  companionId: "azandar",
  abilityId: 194266,
  skillLineId: "companion-azandar-quill-knight",
  skillType: "active",
} as const satisfies TemperCompanionSkill
