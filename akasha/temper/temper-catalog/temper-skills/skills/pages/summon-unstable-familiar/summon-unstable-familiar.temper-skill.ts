import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonUnstableFamiliar = {
  id: "019e6f53-a7e9-75e4-98f9-c98e79de0da6",
  pageTypeSlug: "temper-skill",
  slug: "summon-unstable-familiar",
  title: "Summon Unstable Familiar",
  key: "summon-unstable-familiar",
  baseName: "Summon Unstable Familiar",
  description:
    "\"Command the powers of Oblivion to send a Daedric familiar to fight at your side. The familiar's attacks deal |cffffff1211|r Shock Damage.\\n\\nOnce summoned, you can activate the familiar's special ability for |cffffff3615|r Magicka, dealing |cffffff1467|r Shock Damage every |cffffff2|r seconds for |cffffff20|r seconds to enemies near them.\\n\\nThe familiar remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_unstable_fimiliar.dds",
  esoSkillId: 23304,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
