import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedOnGuard = {
  id: "01a05fd0-1d6e-7e80-a0bf-9f172d74cf32",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-on-guard",
  key: "shared-on-guard",
  title: "On Guard",
  icon: "/esoui/art/icons/ability_companion_1handed_004.dds",
  description:
    "Your Companion bolsters their defenses, granting a damage shield that absorbs up to 25% of their Max Health for $$1 seconds.",
  companionId: "all",
  abilityId: 155328,
  skillLineId: "weapon-one-hand-shield",
  skillType: "active",
  validRoles: ["tank"],
  tags: ["max-health-shield-25pct"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
