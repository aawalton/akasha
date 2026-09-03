import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crushingWeapon103623 = {
  id: "019e6f53-a043-773e-acc6-290fcfe54cd3",
  pageTypeSlug: "temper-skill",
  slug: "crushing-weapon-103623",
  title: "Crushing Weapon",
  key: "crushing-weapon-103623",
  baseName: "Imbue Weapon",
  description:
    '"Infuse your weapon with power, causing your next Light Attack used within |cffffff2|r seconds to deal an additional |cffffff7509|r Physical Damage and applying Major Breach to the target, reducing their Physical and Spell Resistance by |cffffff5948|r for |cffffff5|r seconds.\\n\\nIf the power is not consumed in time, you restore |cffffff1506|r Stamina."',
  icon: "/esoui/art/icons/ability_psijic_003_b.dds",
  esoSkillId: 103623,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 2,
  rank: 3,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
