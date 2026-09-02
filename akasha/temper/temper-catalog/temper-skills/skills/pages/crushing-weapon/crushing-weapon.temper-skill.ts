import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crushingWeapon = {
  id: "01a05fd0-8dee-7092-b3b2-820191b747b5",
  pageTypeSlug: "temper-skill",
  slug: "crushing-weapon",
  title: "Crushing Weapon",
  key: "crushing-weapon",
  baseName: "Imbue Weapon",
  description:
    '"Infuse your weapon with power, causing your next Light Attack used within 2 seconds to deal an additional 2160 Physical Damage and applying Major Breach to the target, reducing their Physical and Spell Resistance by 5948 for 5 seconds.\\n\\nIf the power is not consumed in time, you restore 1620 Stamina."',
  icon: "/esoui/art/icons/ability_psijic_003_b.dds",
  esoSkillId: 40103623,
  isMorph: true,
  learnedLevel: 3,
  lineRankNeeded: 3,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
