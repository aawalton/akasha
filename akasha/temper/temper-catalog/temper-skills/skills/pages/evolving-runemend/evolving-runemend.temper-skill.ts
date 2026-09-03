import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const evolvingRunemend = {
  id: "019e6245-a676-7e3e-af4c-3b14a5478369",
  pageTypeSlug: "temper-skill",
  slug: "evolving-runemend",
  title: "Evolving Runemend",
  key: "evolving-runemend",
  baseName: "Runemend",
  description:
    '"Craft a series of adaptive Apocryphal runes, then propel them at yourself or an ally in front of you. The runes heal for 1161 Health three times, an additional 1302 Health over 6 seconds, and generate Crux.\\n\\nEach active Crux reduces the cost of this ability by 3%."',
  icon: "/esoui/art/icons/ability_arcanist_013_a.dds",
  esoSkillId: 40186189,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
