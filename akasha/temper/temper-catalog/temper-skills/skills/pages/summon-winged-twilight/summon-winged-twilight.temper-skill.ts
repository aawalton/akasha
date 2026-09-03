import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonWingedTwilight = {
  id: "019e6f53-a7ee-73e5-8758-a1576f9230c7",
  pageTypeSlug: "temper-skill",
  slug: "summon-winged-twilight",
  title: "Summon Winged Twilight",
  key: "summon-winged-twilight",
  baseName: "Summon Winged Twilight",
  description:
    "\"Call on Azura to send a winged twilight to fight at your side. The winged twilight's zap deals |cffffff1211|r Shock Damage and its kick deals |cffffff1211|r Shock Damage.\\n\\nOnce summoned, you can activate the winged twilight's special ability for |cffffff4728|r Magicka, causing it to heal a friendly target for |cffffff10960|r and itself for |cffffff5478|r.\\n\\nThe winged twilight remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_lightning_prey.dds",
  esoSkillId: 24613,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
