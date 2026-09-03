import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const tidalChakram186209 = {
  id: "019e6f53-a83f-7100-a565-69624df73807",
  pageTypeSlug: "temper-skill",
  slug: "tidal-chakram-186209",
  title: "Tidal Chakram",
  key: "tidal-chakram-186209",
  baseName: "Chakram Shields",
  description:
    "\"Carve the Baron of Breakers' runes to create spinning discs. Discs surround you or up to |cffffff4|r allies in front of you, granting a shield that absorbs |cffffff8084|r damage for |cffffff6|r seconds.\\n\\nConsume Crux to cause the shields to heal for |cffffff33|r% of the shield's remaining strength every |cffffff1|r second per Crux spent.\\n\\nDiscs prefer your reticle target, or low-Health targets without shields.\"",
  icon: "/esoui/art/icons/ability_arcanist_015_b.dds",
  esoSkillId: 186209,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
