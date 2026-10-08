import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedBashingBulwark = {
  id: "019e668d-c556-7c1b-9e3e-194cd0bcbbec",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-bashing-bulwark",
  key: "shared-bashing-bulwark",
  title: "Bashing Bulwark",
  icon: "/esoui/art/icons/ability_companion_1handed_003.dds",
  description: "Your Companion rushes an enemy and rams them, stunning them for $$1 seconds.",
  abilityId: 155326,
  skillLineId: "temper-companion-skill-line/weapon-one-hand-shield",
  skillType: "temper-skill-type/active",
  skillEffects: "jsonl",
  castConditions: "jsonl",
  createdAt: "2026-05-26T23:10:27.670Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
