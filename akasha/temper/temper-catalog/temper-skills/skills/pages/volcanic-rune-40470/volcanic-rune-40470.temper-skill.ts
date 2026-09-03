import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const volcanicRune40470 = {
  id: "019e6f53-a9cd-7109-b5aa-0a7a7e4b7664",
  pageTypeSlug: "temper-skill",
  slug: "volcanic-rune-40470",
  title: "Volcanic Rune",
  key: "volcanic-rune-40470",
  baseName: "Fire Rune",
  description:
    '"Inscribe a rune of cosmic fire on the earth, which takes |cffffff2|r seconds to arm and lasts for |cffffff20|r seconds.\\n\\nWhen triggered, the rune blasts all enemies in the target area for |cffffff8533|r Flame Damage, knocks them into the air, and stuns them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_001_a.dds",
  esoSkillId: 40470,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
