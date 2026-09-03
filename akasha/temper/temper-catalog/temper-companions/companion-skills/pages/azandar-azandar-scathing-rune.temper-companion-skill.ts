import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarScathingRune = {
  id: "019e6484-383b-7cf7-be2d-7d77fc7c221c",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-scathing-rune",
  key: "azandar-scathing-rune",
  title: "Scathing Rune",
  icon: "/esoui/art/icons/ability_companion_arcanist_runicjab.dds",
  description:
    "Your Companion uses a runic technique to taunt their enemy to attack them for $$1 seconds, applying Minor Maim to them for $$2 seconds, reducing their damage done by 5%.",
  companionId: "azandar",
  abilityId: 193130,
  skillLineId: "companion-azandar-quill-knight",
  skillType: "active",
  validRoles: ["tank", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
