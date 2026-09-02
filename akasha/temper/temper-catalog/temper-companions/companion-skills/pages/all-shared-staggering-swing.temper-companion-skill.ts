import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedStaggeringSwing = {
  id: "01a05fd0-1d72-7433-b036-c1c5a3786ddb",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-staggering-swing",
  key: "shared-staggering-swing",
  title: "Staggering Swing",
  icon: "/esoui/art/icons/ability_companion_2handed_001.dds",
  description:
    "Your Companion slams an enemy with an upward swing and sends them flying, dealing $1 Physical Damage, stunning them for $$2 seconds, and knocking them back 4 meters.",
  companionId: "all",
  abilityId: 152433,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  validRoles: ["dps"],
  tags: ["knockback-4m"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
