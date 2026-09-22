import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedBulwark = {
  id: "019e6484-3825-7700-83fd-b1b8fc5895da",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-bulwark",
  key: "shared-bulwark",
  title: "Bulwark",
  icon: "/esoui/art/icons/ability_companion_armor_heavy.dds",
  description:
    "Your Companion becomes an unstoppable defender, blocking and reflecting all attacks for $$1 seconds.",
  abilityId: 156599,
  skillLineId: "armor-heavy",
  skillType: "temper-skill-type/active",
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
