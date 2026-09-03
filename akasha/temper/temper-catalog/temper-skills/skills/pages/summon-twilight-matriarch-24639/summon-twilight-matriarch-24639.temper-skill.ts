import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonTwilightMatriarch24639 = {
  id: "019e6f53-a7e1-7053-a85d-2c3cee90c576",
  pageTypeSlug: "temper-skill",
  slug: "summon-twilight-matriarch-24639",
  title: "Summon Twilight Matriarch",
  key: "summon-twilight-matriarch-24639",
  baseName: "Summon Winged Twilight",
  description:
    "\"Call on Azura to send a twilight matriarch to fight at your side. The twilight matriarch's zap deals |cffffff1211|r Shock Damage and its kick deals |cffffff1211|r Shock Damage.\\n\\nOnce summoned, you can activate the twilight matriarch's special ability for |cffffff4728|r Magicka, causing it to heal |cffffff2|r friendly targets for |cffffff11321|r and itself for |cffffff5660|r.\\n\\nThe twilight matriarch remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_storm_prey.dds",
  esoSkillId: 24639,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
