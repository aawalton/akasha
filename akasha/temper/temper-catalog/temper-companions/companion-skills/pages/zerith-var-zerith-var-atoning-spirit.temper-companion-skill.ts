import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarAtoningSpirit = {
  id: "01a05fd0-1d87-7039-844b-c79973434222",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-atoning-spirit",
  key: "zerith-var-atoning-spirit",
  title: "Atoning Spirit",
  icon: "/esoui/art/icons/ability_companion_zerith_mendingspirit.dds",
  description:
    "Your Companion conjures a ghostly spirit of a fallen Khajiit to redeem its soul in service to Azurah for $$1 seconds. The spirit heals them or the lowest Health ally around them every 2 seconds restoring $1 Health.",
  companionId: "zerith-var",
  abilityId: 222209,
  skillLineId: "companion-zerith-var-remedy-of-atonement",
  skillType: "active",
  validRoles: ["healer"],
} as const satisfies TemperCompanionSkill
