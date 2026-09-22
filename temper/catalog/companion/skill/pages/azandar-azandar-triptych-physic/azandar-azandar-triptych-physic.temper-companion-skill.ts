import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const azandarAzandarTriptychPhysic = {
  id: "019e6484-3842-79f2-9ad8-f809263c772e",
  type: "page-type/temper-companion-skill",
  slug: "azandar-azandar-triptych-physic",
  key: "azandar-triptych-physic",
  title: "Triptych Physic",
  icon: "/esoui/art/icons/ability_companion_arcanist_runemend.dds",
  description:
    "Your Companion launches a trio of restorative runes at themselves or an ally, healing for $1 Health three times.",
  companionId: "temper-eso-companion/azandar",
  abilityId: 192574,
  skillLineId: "temper-companion-skill-line/companion-azandar-revitalizing-researcher",
  skillType: "temper-skill-type/active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
