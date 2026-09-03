import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedSkeletalAegis = {
  id: "019e6688-86f5-71bd-a87c-0282a2c22291",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-skeletal-aegis",
  key: "shared-skeletal-aegis",
  title: "Skeletal Aegis",
  icon: "/esoui/art/icons/ability_companion_undaunted_005.dds",
  description:
    "Your Companion surrounds themselves with a whirlwind of bones, granting a damage shield for 30% of their Max Health for $$1 seconds. While the damage shield holds, an ally near them can activate the Bone Aegis synergy, granting them a damage shield for 50% of their Max Health for $$2 seconds.",
  companionId: "all",
  abilityId: 155693,
  skillLineId: "guild-undaunted",
  skillType: "active",
  validRoles: ["tank"],
  tags: ["synergy"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
