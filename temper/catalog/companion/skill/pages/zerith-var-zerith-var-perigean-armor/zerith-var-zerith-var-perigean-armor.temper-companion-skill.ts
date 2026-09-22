import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const zerithVarZerithVarPerigeanArmor = {
  id: "019e6484-38b3-76f6-bc94-1f0f38294f83",
  type: "page-type/temper-companion-skill",
  slug: "zerith-var-zerith-var-perigean-armor",
  key: "zerith-var-perigean-armor",
  title: "Perigean Armor",
  icon: "/esoui/art/icons/ability_companion_zerith_bonearmor.dds",
  description:
    "Your Companion wraps themselves in moon-empowered bone, granting them Major Resolve, increasing their Spell and Physical Resistance by 5948 for $$1 seconds. While active, enemies that strike them with ranged attacks will be pulled toward them once every 2 seconds and become taunted for $$3 seconds if they are not already taunted. Creates a corpse when effect completes.",
  companionId: "temper-eso-companion/zerith-var",
  abilityId: 213165,
  skillLineId: "temper-companion-skill-line/companion-zerith-var-guardians-commitment",
  skillType: "temper-skill-type/active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
