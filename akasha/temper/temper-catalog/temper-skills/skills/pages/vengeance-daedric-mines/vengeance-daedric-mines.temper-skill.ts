import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDaedricMines = {
  id: "019e6f53-a8e2-76cb-b62a-10fc81bb0b61",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-daedric-mines",
  title: "Vengeance Daedric Mines",
  key: "vengeance-daedric-mines",
  baseName: "Vengeance Daedric Mines",
  description:
    '"Surprise your foes by detonating |cffffff3|r volatile Daedric mines around you, dealing |cffffff8820|r Magic Damage to up 3 enemies and reducing their movement speed by |cffffff30|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_daedric_mines.dds",
  esoSkillId: 237812,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-dark-magic",
} as const satisfies TemperSkill
