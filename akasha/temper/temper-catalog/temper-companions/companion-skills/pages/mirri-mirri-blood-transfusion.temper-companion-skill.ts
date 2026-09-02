import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriBloodTransfusion = {
  id: "01a05fd0-1d7f-7228-a6bc-c8f6dc98f786",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-blood-transfusion",
  key: "mirri-blood-transfusion",
  title: "Blood Transfusion",
  icon: "/esoui/art/icons/ability_companion_nightblade_unique.dds",
  description:
    "Your Companion infuses an ally with blood, healing them for $1 Health over $$1 seconds.",
  companionId: "mirri",
  abilityId: 157287,
  skillLineId: "companion-mirri-soul-thief",
  skillType: "active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
