import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const mirriMirriBloodTransfusion = {
  id: "019e6484-387c-7710-aeee-ac5010dab342",
  type: "page-type/temper-companion-skill",
  slug: "mirri-mirri-blood-transfusion",
  key: "mirri-blood-transfusion",
  title: "Blood Transfusion",
  icon: "/esoui/art/icons/ability_companion_nightblade_unique.dds",
  description:
    "Your Companion infuses an ally with blood, healing them for $1 Health over $$1 seconds.",
  companionId: "temper-eso-companion/mirri",
  abilityId: 157287,
  skillLineId: "temper-companion-skill-line/companion-mirri-soul-thief",
  skillType: "temper-skill-type/active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
