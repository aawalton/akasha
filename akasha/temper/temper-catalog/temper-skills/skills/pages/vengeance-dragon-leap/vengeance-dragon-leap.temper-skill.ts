import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDragonLeap = {
  id: "01a05fd1-d29a-70c8-9b6f-06c7b2cfd687",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-dragon-leap",
  title: "Vengeance Dragon Leap",
  key: "vengeance-dragon-leap",
  baseName: "Vengeance Dragon Leap",
  description:
    '"Launch yourself at an enemy, dealing |cffffff20285|r Physical Damage to up to 3 enemies in the area."',
  icon: "/esoui/art/icons/ability_dragonknight_009.dds",
  esoSkillId: 237648,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-draconic-power",
  skillType: "ultimate",
  subcategoryId: "vengeance-dragonknight-draconic-power",
} as const satisfies TemperSkill
