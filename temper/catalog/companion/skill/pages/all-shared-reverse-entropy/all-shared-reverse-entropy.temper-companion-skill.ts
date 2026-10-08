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
  skillLineId: "temper-companion-skill-line/guild-mages",
  skillType: "temper-skill-type/active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T23:04:44.018Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
