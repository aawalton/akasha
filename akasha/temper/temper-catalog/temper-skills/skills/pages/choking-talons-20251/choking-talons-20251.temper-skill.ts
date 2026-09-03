import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const chokingTalons20251 = {
  id: "019e6f53-9fe2-78ba-987a-9b47c62a8d6b",
  pageTypeSlug: "temper-skill",
  slug: "choking-talons-20251",
  title: "Choking Talons",
  key: "choking-talons-20251",
  baseName: "Dark Talons",
  description:
    '"Call forth talons from the ground, dealing |cffffff6401|r Flame Damage to enemies near you and immobilizing them for |cffffff4|r seconds. \\n\\nEnemies hit are afflicted with Minor Maim, reducing damage done by |cffffff5|r% for |cffffff20|r seconds. \\n\\nAn ally near the talons can activate the Ignite synergy, dealing |cffffff10328|r Flame Damage to all enemies held within them."',
  icon: "/esoui/art/icons/ability_dragonknight_010_a.dds",
  esoSkillId: 20251,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
