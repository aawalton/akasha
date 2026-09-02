import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarPerigeanArmor = {
  id: "01a05fd0-1d88-75e9-be5d-e75f1d3e07d3",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-perigean-armor",
  key: "zerith-var-perigean-armor",
  title: "Perigean Armor",
  icon: "/esoui/art/icons/ability_companion_zerith_bonearmor.dds",
  description:
    "Your Companion wraps themselves in moon-empowered bone, granting them Major Resolve, increasing their Spell and Physical Resistance by 5948 for $$1 seconds. While active, enemies that strike them with ranged attacks will be pulled toward them once every 2 seconds and become taunted for $$3 seconds if they are not already taunted. Creates a corpse when effect completes.",
  companionId: "zerith-var",
  abilityId: 213165,
  skillLineId: "companion-zerith-var-guardians-commitment",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
