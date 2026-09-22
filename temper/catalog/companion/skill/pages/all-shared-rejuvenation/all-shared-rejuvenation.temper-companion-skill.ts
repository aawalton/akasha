import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedRejuvenation = {
  id: "019e668d-c55a-7617-a74d-90aee967042b",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-rejuvenation",
  key: "shared-rejuvenation",
  title: "Rejuvenation",
  icon: "/esoui/art/icons/ability_companion_restorationstaff_002.dds",
  description:
    "Your Companion shares their staff's life-giving energy, healing themselves and a nearby ally for $1 Health over $$1 seconds.",
  abilityId: 153066,
  skillLineId: "temper-companion-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
