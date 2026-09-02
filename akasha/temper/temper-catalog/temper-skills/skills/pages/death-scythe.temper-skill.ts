import type { TemperSkill } from "../temper-skill.page-type.ts"

export const deathScythe = {
  id: "01a05fd0-8e01-764f-a076-5a797df5412b",
  pageTypeSlug: "temper-skill",
  slug: "death-scythe",
  title: "Death Scythe",
  key: "death-scythe",
  baseName: "Death Scythe",
  description:
    '"Slice into your enemy\'s life force, dealing |cffffff6400|r Magic Damage.\\n\\nYou heal for |cffffff3016|r Health for the first enemy hit, and an additional |cffffff1005|r for each additional enemy hit, up to five times. The healing of this ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_necromancer_007.dds",
  esoSkillId: 115115,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
