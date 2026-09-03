import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonUnstableClannfear23319 = {
  id: "019e6f53-a7e7-7fc8-906d-59028eab45a9",
  pageTypeSlug: "temper-skill",
  slug: "summon-unstable-clannfear-23319",
  title: "Summon Unstable Clannfear",
  key: "summon-unstable-clannfear-23319",
  baseName: "Summon Unstable Familiar",
  description:
    "\"Command the powers of Oblivion to send a Daedric clannfear to fight at your side. The clannfear's headbutt deals |cffffff1250|r Physical Damage, while its tail spike hits nearby enemies for |cffffff1320|r Physical Damage after |cffffff1|r second.  \\n\\nOnce summoned, you can activate the clannfear's special ability for |cffffff4450|r Magicka, healing you for |cffffff6437|r and the clannfear for |cffffff3218|r.\\n\\nThe clannfear remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_unstable_clannfear.dds",
  esoSkillId: 23319,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
