import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const azandarAzandarZoneOfRecuperation = {
  id: "019e6484-3845-7a06-872c-e1a6dc8cb1f4",
  type: "page-type/temper-companion-skill",
  slug: "azandar-azandar-zone-of-recuperation",
  key: "azandar-zone-of-recuperation",
  title: "Zone of Recuperation",
  icon: "/esoui/art/icons/ability_companion_arcanist_domain.dds",
  description:
    "Your Companion outlines a domain of eldritch power, healing them and their allies standing within for $1 Health over $$1 seconds and granting 150 Health, Magicka, and Stamina Recovery.",
  companionId: "temper-eso-companion/azandar",
  abilityId: 193126,
  skillLineId: "temper-companion-skill-line/companion-azandar-revitalizing-researcher",
  skillType: "temper-skill-type/active",
  validRoles: ["healer", "tank"],
  tags: ["ground-effect"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.301Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
