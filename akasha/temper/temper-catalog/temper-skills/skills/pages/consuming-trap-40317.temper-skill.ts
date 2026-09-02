import type { TemperSkill } from "../temper-skill.page-type.ts"

export const consumingTrap40317 = {
  id: "01a05fd0-43a1-7ec7-8199-bd77aa0681b9",
  pageTypeSlug: "temper-skill",
  slug: "consuming-trap-40317",
  title: "Consuming Trap",
  key: "consuming-trap-40317",
  baseName: "Soul Trap",
  description:
    '"Lay claim to an enemy\'s soul, dealing |cffffff15235|r Magic Damage over |cffffff20|r seconds.\\n\\nIf an affected enemy dies, you fill an empty Soul Gem, heal for |cffffff4022|r Health, and restore |cffffff2832|r Magicka and |cffffff5527|r Stamina. This portion of the ability scales off your Max Health, Magicka, and Stamina."',
  icon: "/esoui/art/icons/ability_otherclass_001_b.dds",
  esoSkillId: 40317,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill
