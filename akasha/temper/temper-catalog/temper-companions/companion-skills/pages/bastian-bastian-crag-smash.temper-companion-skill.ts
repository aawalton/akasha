import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianCragSmash = {
  id: "01a05fd0-1d78-7548-9d0b-64333fa99771",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-crag-smash",
  key: "bastian-crag-smash",
  title: "Crag Smash",
  icon: "/esoui/art/icons/ability_companion_dragonknight_013.dds",
  description: "Your Companion hurls a chunk of rock at an enemy, dealing $1 Physical Damage.",
  companionId: "bastian",
  abilityId: 155186,
  skillLineId: "companion-bastian-ardent-warrior",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
