import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarBladeOfTheCrossing = {
  id: "01a05fd0-1d87-7e65-a51e-e00c3b70b2d3",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-blade-of-the-crossing",
  key: "zerith-var-blade-of-the-crossing",
  title: "Blade of the Crossing",
  icon: "/esoui/art/icons/ability_companion_zerith_mooncrescent.dds",
  description:
    "Your Companion calls upon the power of Azurah, swinging a blade of lunar light in front of them, dealing $1 Magic Damage. Enemies damaged by this ability have Minor Magickasteal applied for $$2 seconds, causing them and their allies to restore 168 Magicka to attackers every 1 second when damaging enemies.",
  companionId: "zerith-var",
  abilityId: 213169,
  skillLineId: "companion-zerith-var",
  skillType: "ultimate",
  validRoles: ["dps"],
  alternateAbilityIds: [213678],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
