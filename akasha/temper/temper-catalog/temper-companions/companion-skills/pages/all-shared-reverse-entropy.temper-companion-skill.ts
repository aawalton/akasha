import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedReverseEntropy = {
  id: "01a05fd0-1d70-712b-ad12-618f566cbfb1",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-reverse-entropy",
  key: "shared-reverse-entropy",
  title: "Reverse Entropy",
  icon: "/esoui/art/icons/ability_companion_mageguild_004.dds",
  description:
    "Your Companion envelops an ally with stabilizing magic, healing them for $1 Health over $$1 seconds.",
  companionId: "all",
  abilityId: 155408,
  skillLineId: "guild-mages",
  skillType: "active",
  validRoles: ["healer"],
} as const satisfies TemperCompanionSkill
