import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFireRune = {
  id: "019e6f53-a90c-791b-b45d-6681bca9d963",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-fire-rune",
  title: "Vengeance Fire Rune",
  key: "vengeance-fire-rune",
  baseName: "Vengeance Fire Rune",
  description:
    '"Inscribe a rune of cosmic fire on the earth, which takes |cffffff2|r seconds to arm, and blasts up to 3 enemies in the target area for |cffffff11760|r Flame Damage."',
  icon: "/esoui/art/icons/ability_mageguild_001.dds",
  esoSkillId: 246482,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-mages-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-mages-guild",
} as const satisfies TemperSkill
