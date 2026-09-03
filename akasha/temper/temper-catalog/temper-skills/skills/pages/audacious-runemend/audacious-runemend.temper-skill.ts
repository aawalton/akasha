import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const audaciousRunemend = {
  id: "019e6245-a5ee-73c9-ac62-27b2694a45dd",
  pageTypeSlug: "temper-skill",
  slug: "audacious-runemend",
  title: "Audacious Runemend",
  key: "audacious-runemend",
  baseName: "Runemend",
  description:
    '"Craft a series of virtuous Apocryphal runes, then propel them at yourself or an ally in front of you. The runes heal for 1199 Health three times and generate Crux. \\n\\nHealing a target under 50% Health grants them Minor Heroism for 6 seconds, generating 1 Ultimate every 1.5 seconds.\\n\\nEach active Crux reduces the cost of this ability by 3%."',
  icon: "/esoui/art/icons/ability_arcanist_013_b.dds",
  esoSkillId: 40186191,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
