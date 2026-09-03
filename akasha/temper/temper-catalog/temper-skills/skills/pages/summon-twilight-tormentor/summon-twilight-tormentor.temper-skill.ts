import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonTwilightTormentor = {
  id: "019e6245-a747-7c23-bb51-e360c609a940",
  pageTypeSlug: "temper-skill",
  slug: "summon-twilight-tormentor",
  title: "Summon Twilight Tormentor",
  key: "summon-twilight-tormentor",
  baseName: "Summon Winged Twilight",
  description:
    "\"Call on Azura to send a twilight tormentor to fight at your side. The twilight tormentor's zap deals 478 Shock Damage and its kick deals 478 Shock Damage.\\n\\nOnce summoned, you can activate the twilight tormentor's special ability for 2700 Magicka, causing it to deal 60% more damage to enemies above 50% Health for 20 seconds.\\n\\nThe twilight tormentor remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_lightning_matriarch.dds",
  esoSkillId: 30598,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
