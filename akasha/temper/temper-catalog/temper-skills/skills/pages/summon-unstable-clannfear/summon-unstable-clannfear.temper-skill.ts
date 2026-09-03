import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonUnstableClannfear = {
  id: "019e6245-a748-7d15-b460-9247db25c598",
  pageTypeSlug: "temper-skill",
  slug: "summon-unstable-clannfear",
  title: "Summon Unstable Clannfear",
  key: "summon-unstable-clannfear",
  baseName: "Summon Unstable Familiar",
  description:
    "\"Command the powers of Oblivion to send a Daedric clannfear to fight at your side. The clannfear's headbutt deals 358 Physical Damage, while its tail spike hits nearby enemies for 358 Physical Damage after 1 second.  \\n\\nOnce summoned, you can activate the clannfear's special ability for 4320 Magicka, healing you for 5121 and the clannfear for 2560.\\n\\nThe clannfear remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_unstable_clannfear.dds",
  esoSkillId: 30657,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
