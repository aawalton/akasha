import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const mirriMirriDynamic = {
  id: "019e6484-387d-7e76-835a-f1e88c408de4",
  type: "page-type/temper-companion-skill",
  slug: "mirri-mirri-dynamic",
  key: "mirri-dynamic",
  title: "Dynamic",
  icon: "/esoui/art/icons/passive_companion_weapon_023.dds",
  description: "Increases damage done by 3% and healing done by 3%.",
  companionId: "temper-eso-companion/mirri",
  abilityId: 157250,
  skillLineId: "temper-companion-skill-line/companion-mirri",
  skillType: "temper-skill-type/passive",
  validRoles: ["dps", "healer"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.357Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
