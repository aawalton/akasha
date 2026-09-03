import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const audaciousRunemend186191 = {
  id: "019e6f53-9ed1-75af-b974-2c61d0e53065",
  pageTypeSlug: "temper-skill",
  slug: "audacious-runemend-186191",
  title: "Audacious Runemend",
  key: "audacious-runemend-186191",
  baseName: "Runemend",
  description:
    '"Craft a series of virtuous Apocryphal runes, then propel them at yourself or an ally in front of you. The runes heal for |cffffff3773|r Health three times and generate Crux. \\n\\nHealing a target under |cffffff50|r% Health grants them Minor Heroism for |cffffff6|r seconds, generating |cffffff1|r Ultimate every |cffffff1.5|r seconds.\\n\\nEach active Crux reduces the cost of this ability by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_arcanist_013_b.dds",
  esoSkillId: 186191,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
