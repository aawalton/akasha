import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedRejuvenation = {
  id: "019e668d-c55a-7617-a74d-90aee967042b",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-rejuvenation",
  key: "shared-rejuvenation",
  title: "Rejuvenation",
  icon: "/esoui/art/icons/ability_companion_restorationstaff_002.dds",
  description:
    "Your Companion shares their staff's life-giving energy, healing themselves and a nearby ally for $1 Health over $$1 seconds.",
  companionId: "all",
  abilityId: 153066,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
