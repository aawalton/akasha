import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const writhingRuneblades = {
  id: "019e6245-a771-7030-8707-e19040574111",
  pageTypeSlug: "temper-skill",
  slug: "writhing-runeblades",
  title: "Writhing Runeblades",
  key: "writhing-runeblades",
  baseName: "Runeblades",
  description:
    '"Craft a series of Apocryphal runes before launching them at a foe, dealing 718 Magic Damage three times and generating Crux. \\n\\nThis ability gains between 1095 and 2191 Weapon and Spell Critical rating and deals 3% increased damage for each active Crux when cast."',
  icon: "/esoui/art/icons/ability_arcanist_001_a.dds",
  esoSkillId: 40185803,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
