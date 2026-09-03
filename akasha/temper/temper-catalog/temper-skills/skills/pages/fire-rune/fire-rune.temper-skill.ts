import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fireRune = {
  id: "019e6f53-a200-7050-8802-7e01537493c4",
  pageTypeSlug: "temper-skill",
  slug: "fire-rune",
  title: "Fire Rune",
  key: "fire-rune",
  baseName: "Fire Rune",
  description:
    '"Inscribe a rune of cosmic fire on the earth, which takes |cffffff2|r seconds to arm and lasts for |cffffff20|r seconds.\\n\\nWhen triggered, the rune blasts all enemies in the target area for |cffffff8533|r Flame Damage."',
  icon: "/esoui/art/icons/ability_mageguild_001.dds",
  esoSkillId: 31632,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
