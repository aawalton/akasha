import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedCrimsonFont = {
  id: "019e6688-86f0-77f2-9cee-f65e46f9b17f",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-crimson-font",
  key: "shared-crimson-font",
  title: "Crimson Font",
  icon: "/esoui/art/icons/ability_companion_undaunted_001.dds",
  description:
    "Your Companion conjures a fountain of blood to sustain themselves and allies around it, healing for $1 Health every 1 second for 16 seconds. Allies near the fountain can activate the Crimson Funnel synergy, healing for 50% of their Max Health.",
  companionId: "all",
  abilityId: 155515,
  skillLineId: "guild-undaunted",
  skillType: "active",
  validRoles: ["healer"],
  tags: ["synergy"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
