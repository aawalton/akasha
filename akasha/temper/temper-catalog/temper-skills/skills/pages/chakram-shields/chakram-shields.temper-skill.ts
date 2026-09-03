import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const chakramShields = {
  id: "019e6f53-9fd2-7776-a28f-0d9c27002b9e",
  pageTypeSlug: "temper-skill",
  slug: "chakram-shields",
  title: "Chakram Shields",
  key: "chakram-shields",
  baseName: "Chakram Shields",
  description:
    '"Carve the runes of the Blind Man to call forth spinning mystical discs. Discs surround you or up to |cffffff4|r allies in front of you, granting a shield that absorbs |cffffff8084|r damage for |cffffff6|r seconds.\\n\\nDiscs prefer your reticle target, or low-Health targets without shields."',
  icon: "/esoui/art/icons/ability_arcanist_015.dds",
  esoSkillId: 183447,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
