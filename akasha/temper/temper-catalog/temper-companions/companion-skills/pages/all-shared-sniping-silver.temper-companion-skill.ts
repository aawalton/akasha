import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedSnipingSilver = {
  id: "01a05fd0-1d71-730f-b392-80cb1940b0d8",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-sniping-silver",
  key: "shared-sniping-silver",
  title: "Sniping Silver",
  icon: "/esoui/art/icons/ability_companion_fightersguild_003.dds",
  description:
    "Your Companion fires a Dawnguard Vampire Hunter's crossbow bolt at an enemy, dealing $1 Physical Damage. Deals double damage if the enemy is an Undead, Daedra, or Werewolf.",
  companionId: "all",
  abilityId: 153686,
  skillLineId: "guild-fighters",
  skillType: "active",
  validRoles: ["dps"],
  tags: ["double-damage-vs-monsters"],
} as const satisfies TemperCompanionSkill
