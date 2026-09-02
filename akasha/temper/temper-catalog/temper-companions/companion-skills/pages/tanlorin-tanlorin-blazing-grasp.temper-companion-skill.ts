import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinBlazingGrasp = {
  id: "01a05fd0-1d84-7be7-aac0-937493397ab4",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-blazing-grasp",
  key: "tanlorin-blazing-grasp",
  title: "Blazing Grasp",
  icon: "/esoui/art/icons/ability_companion_dragonknight_005.dds",
  description:
    "Your Companion launches a fiery chain to grasp and pull an enemy to them, taunting them for $$2 seconds if they are not already taunted.",
  companionId: "tanlorin",
  abilityId: 153839,
  skillLineId: "companion-tanlorin-draconic-armor",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
