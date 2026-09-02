import type { TemperSkill } from "../temper-skill.page-type.ts"

export const ravenousGoliath118279 = {
  id: "01a05fd1-2e2c-7c58-ada3-b8c77e6f68bb",
  pageTypeSlug: "temper-skill",
  slug: "ravenous-goliath-118279",
  title: "Ravenous Goliath",
  key: "ravenous-goliath-118279",
  baseName: "Bone Goliath Transformation",
  description:
    '"Become a horrific Ravenous Goliath, increasing your Max Health by |cffffff30000|r for |cffffff20|r seconds and immediately restoring |cffffff30000|r Health. \\n\\nWhile transformed, your damaging Light Attacks restore |cffffff402|r Health and your fully-charged Heavy Attacks restore |cffffff1005|r Health. You deal |cffffff1078|r Magic Damage to nearby enemies every second and heal for that amount. These abilities scale off your Max Health."',
  icon: "/esoui/art/icons/ability_necromancer_012_b.dds",
  esoSkillId: 118279,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "ultimate",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
