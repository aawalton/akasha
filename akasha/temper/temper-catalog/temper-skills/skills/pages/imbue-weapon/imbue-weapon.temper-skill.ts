import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const imbueWeapon = {
  id: "019e6f53-a353-7d4e-b18e-aa361c43e328",
  pageTypeSlug: "temper-skill",
  slug: "imbue-weapon",
  title: "Imbue Weapon",
  key: "imbue-weapon",
  baseName: "Imbue Weapon",
  description:
    '"Infuse your weapon with power, causing your next Light Attack used within |cffffff2|r seconds to deal an additional |cffffff7269|r Physical Damage.\\n\\nIf the power is not consumed in time, you restore |cffffff1506|r Stamina."',
  icon: "/esoui/art/icons/ability_psijic_003.dds",
  esoSkillId: 103483,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
