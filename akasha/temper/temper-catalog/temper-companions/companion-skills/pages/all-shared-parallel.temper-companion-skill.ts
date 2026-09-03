import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedParallel = {
  id: "019e6688-86f1-78d9-8364-4fb564175667",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-parallel",
  key: "shared-parallel",
  title: "Parallel",
  icon: "/esoui/art/icons/ability_companion_mageguild_003.dds",
  description: "Your Companion barters with Oblivion for power, generating 50 Ultimate.",
  companionId: "all",
  abilityId: 155411,
  skillLineId: "guild-mages",
  skillType: "active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
