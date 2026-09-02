import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriDynamic = {
  id: "01a05fd0-1d7f-745f-93d7-17056455e150",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-dynamic",
  key: "mirri-dynamic",
  title: "Dynamic",
  icon: "/esoui/art/icons/passive_companion_weapon_023.dds",
  description: "Increases damage done by 3% and healing done by 3%.",
  companionId: "mirri",
  abilityId: 157250,
  skillLineId: "companion-mirri",
  skillType: "passive",
  validRoles: ["dps", "healer"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
