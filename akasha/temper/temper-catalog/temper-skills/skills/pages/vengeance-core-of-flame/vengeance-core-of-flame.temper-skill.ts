import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceCoreOfFlame = {
  id: "019e6f53-a8d9-7f4d-adba-71d997ca501e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-core-of-flame",
  title: "Vengeance Core of Flame",
  key: "vengeance-core-of-flame",
  baseName: "Vengeance Core of Flame",
  description:
    '"Channel draconic energy to suck in the air around you, increasing your Health, Magicka, and Stamina Recovery by |cffffff1500|r for |cffffff4|r seconds. Afterwards, you exhale fire, dealing |cffffff8820|r Flame Damage to up to 3 nearby enemies."',
  icon: "/esoui/art/icons/ability_dragonknight_012.dds",
  esoSkillId: 237641,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-ardent-flame",
} as const satisfies TemperSkill
