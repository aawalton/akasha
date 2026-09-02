import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedParallel = {
  id: "01a05fd0-1d6f-7caa-91c9-e712c124a75e",
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
} as const satisfies TemperCompanionSkill
