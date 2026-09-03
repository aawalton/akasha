import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const consumingTrap = {
  id: "019e6251-4ca1-72e3-961b-73495b9c3907",
  pageTypeSlug: "temper-skill",
  slug: "consuming-trap",
  title: "Consuming Trap",
  key: "consuming-trap",
  baseName: "Soul Trap",
  description:
    '"Lay claim to an enemy\'s soul, dealing 4642 Magic Damage over 20 seconds.\\n\\nIf an affected enemy dies, you fill an empty Soul Gem, heal for 3200 Health, and restore 2400 Magicka and 2400 Stamina. This portion of the ability scales off your Max Health, Magicka, and Stamina."',
  icon: "/esoui/art/icons/ability_otherclass_001_b.dds",
  esoSkillId: 43083,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill
