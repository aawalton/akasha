import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runemend = {
  id: "01a05fd1-7ca8-7f14-99f9-f56779580254",
  pageTypeSlug: "temper-skill",
  slug: "runemend",
  title: "Runemend",
  key: "runemend",
  baseName: "Runemend",
  description:
    '"Craft a series of precise Apocryphal runes, then propel them at yourself or an ally in front of you. The runes heal for |cffffff3652|r Health three times and generate Crux.\\n\\nEach active Crux reduces the cost of this ability by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_arcanist_013.dds",
  esoSkillId: 183261,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
