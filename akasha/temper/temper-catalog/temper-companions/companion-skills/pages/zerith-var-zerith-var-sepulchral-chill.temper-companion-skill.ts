import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarSepulchralChill = {
  id: "01a05fd0-1d89-72ce-8c86-c0c81b65347b",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-sepulchral-chill",
  key: "zerith-var-sepulchral-chill",
  title: "Sepulchral Chill",
  icon: "/esoui/art/icons/ability_companion_necromancer_boneyard.dds",
  description:
    "Your Companion sanctifies the ground at the target location, dealing $1 Frost Damage every 2 seconds over 8 seconds and applying Major Breach to enemies within, reducing their Spell and Physical Resistance by 5948 for $$2 seconds.",
  companionId: "zerith-var",
  abilityId: 213158,
  skillLineId: "companion-zerith-var-warriors-banishment",
  skillType: "active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
