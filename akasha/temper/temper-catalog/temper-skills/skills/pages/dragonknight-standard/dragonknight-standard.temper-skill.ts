import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dragonknightStandard = {
  id: "019e6f53-a0e8-75f4-b139-ac959397b730",
  pageTypeSlug: "temper-skill",
  slug: "dragonknight-standard",
  title: "Dragonknight Standard",
  key: "dragonknight-standard",
  baseName: "Dragonknight Standard",
  description:
    '"Call down a battle standard for |cffffff15|r seconds, rallying you and allies inside the area, increasing Weapon and Spell Damage by |cffffff300|r and reducing damage taken by |cffffff10|r%.\\n\\nAn ally near the standard can activate the Shackle synergy, dealing |cffffff12393|r Flame Damage to enemies in the area and immobilizing them for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_006.dds",
  esoSkillId: 28988,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "ultimate",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
