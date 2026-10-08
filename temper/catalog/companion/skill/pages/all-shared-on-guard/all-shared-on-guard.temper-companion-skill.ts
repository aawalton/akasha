import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedOnGuard = {
  id: "019e668d-c557-7728-ab3a-ab5815a71312",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-on-guard",
  key: "shared-on-guard",
  title: "On Guard",
  icon: "/esoui/art/icons/ability_companion_1handed_004.dds",
  description:
    "Your Companion bolsters their defenses, granting a damage shield that absorbs up to 25% of their Max Health for $$1 seconds.",
  abilityId: 155328,
  skillLineId: "temper-companion-skill-line/weapon-one-hand-shield",
  skillType: "temper-skill-type/active",
  validRoles: ["tank"],
  tags: ["max-health-shield-25pct"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T23:10:27.671Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
