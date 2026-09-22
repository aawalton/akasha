import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedReverseEntropy = {
  id: "019e6688-86f2-7974-b9a7-518094a485da",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-reverse-entropy",
  key: "shared-reverse-entropy",
  title: "Reverse Entropy",
  icon: "/esoui/art/icons/ability_companion_mageguild_004.dds",
  description:
    "Your Companion envelops an ally with stabilizing magic, healing them for $1 Health over $$1 seconds.",
  abilityId: 155408,
  skillLineId: "guild-mages",
  skillType: "temper-skill-type/active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
