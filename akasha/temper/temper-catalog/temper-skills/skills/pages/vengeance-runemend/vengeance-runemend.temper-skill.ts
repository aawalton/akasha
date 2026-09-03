import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRunemend = {
  id: "019e6f53-a970-7df0-8fd0-44ddd93ad686",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-runemend",
  title: "Vengeance Runemend",
  key: "vengeance-runemend",
  baseName: "Vengeance Runemend",
  description:
    '"Craft a precise Apocryphal rune, then propel it at yourself or an ally in front of you. The rune heals for |cffffff14459|r Health and generates Crux."',
  icon: "/esoui/art/icons/ability_arcanist_013.dds",
  esoSkillId: 238429,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-curative-runeforms",
} as const satisfies TemperSkill
