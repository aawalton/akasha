import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedSavageInstinct = {
  id: "019e6688-86f4-75d4-87ab-23740d103bb9",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-savage-instinct",
  key: "shared-savage-instinct",
  title: "Savage Instinct",
  icon: "/esoui/art/icons/ability_companion_undaunted_002.dds",
  description:
    "Your Companion ignites the fires of hate in an enemy's heart, dealing $1 Magic Damage and taunting the enemy to attack them for $$2 seconds. An ally targeting the enemy can activate the Savage Implosion synergy, causing the enemy to implode after 2 seconds dealing $1 Magic Damage to them and other nearby enemies.",
  companionId: "all",
  abilityId: 157240,
  skillLineId: "guild-undaunted",
  skillType: "active",
  validRoles: ["dps", "tank"],
  tags: ["synergy"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
