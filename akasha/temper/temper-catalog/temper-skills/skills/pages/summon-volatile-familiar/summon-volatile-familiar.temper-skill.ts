import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonVolatileFamiliar = {
  id: "019e6245-a749-7de0-a4a7-8155acef1155",
  pageTypeSlug: "temper-skill",
  slug: "summon-volatile-familiar",
  title: "Summon Volatile Familiar",
  key: "summon-volatile-familiar",
  baseName: "Summon Unstable Familiar",
  description:
    "\"Command the powers of Oblivion to send a Daedric familiar to fight at your side. The familiar's attacks deal 358 Shock Damage.\\n\\nOnce summoned, you can activate the familiar's special ability for 3510 Magicka, dealing 435 Shock Damage every 2 seconds for 20 seconds to enemies near them. The second hit stuns enemies hit for 3 seconds.\\n\\nThe familiar remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_speedy_familiar.dds",
  esoSkillId: 30674,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
