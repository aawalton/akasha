import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedSwiftAssault = {
  id: "01a05fd0-1d73-76ce-8da5-0f47b1daf9a3",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-swift-assault",
  key: "shared-swift-assault",
  title: "Swift Assault",
  icon: "/esoui/art/icons/ability_companion_dualwield_002.dds",
  description:
    "Your Companion floods an enemy with steel, battering them with five consecutive attacks that each deal $1 Physical Damage.",
  companionId: "all",
  abilityId: 152629,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
