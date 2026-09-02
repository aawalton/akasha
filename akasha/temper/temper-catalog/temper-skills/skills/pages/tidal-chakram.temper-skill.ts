import type { TemperSkill } from "../temper-skill.page-type.ts"

export const tidalChakram = {
  id: "01a05fd1-d268-7a6b-ad5c-799c3b23c47f",
  pageTypeSlug: "temper-skill",
  slug: "tidal-chakram",
  title: "Tidal Chakram",
  key: "tidal-chakram",
  baseName: "Chakram Shields",
  description:
    "\"Carve the Baron of Breakers' runes to create spinning discs. Discs surround you or up to 4 allies in front of you, granting a shield that absorbs 3264 damage for 6 seconds.\\n\\nConsume Crux to cause the shields to heal for 33% of the shield's remaining strength every 1 second per Crux spent.\\n\\nDiscs prefer your reticle target, or low-Health targets without shields.\"",
  icon: "/esoui/art/icons/ability_arcanist_015_b.dds",
  esoSkillId: 40186209,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
