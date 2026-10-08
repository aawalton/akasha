import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedParallel = {
  id: "019e6688-86f1-78d9-8364-4fb564175667",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-parallel",
  key: "shared-parallel",
  title: "Parallel",
  icon: "/esoui/art/icons/ability_companion_mageguild_003.dds",
  description: "Your Companion barters with Oblivion for power, generating 50 Ultimate.",
  abilityId: 155411,
  skillLineId: "temper-companion-skill-line/guild-mages",
  skillType: "temper-skill-type/active",
  skillEffects: "jsonl",
  createdAt: "2026-05-26T23:04:44.017Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
