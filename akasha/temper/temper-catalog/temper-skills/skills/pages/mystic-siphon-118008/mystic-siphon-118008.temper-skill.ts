import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mysticSiphon118008 = {
  id: "019e6f53-a4ab-7955-9d72-71142742e981",
  pageTypeSlug: "temper-skill",
  slug: "mystic-siphon-118008",
  title: "Mystic Siphon",
  key: "mystic-siphon-118008",
  baseName: "Shocking Siphon",
  description:
    '"Violently drain the last spark of life from a corpse, dealing |cffffff21510|r Shock Damage over |cffffff20|r seconds to all enemies around the corpse and between you and the corpse. You also gain Major Savagery and Prophecy for |cffffff20|r seconds, increasing your Weapon and Spell Critical rating by |cffffff2629|r.\\n\\nWhile siphoning the corpse you gain |cffffff150|r Health, Magicka, and Stamina Recovery.\\n\\nWhile slotted, your damage done is increased by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_necromancer_005_a.dds",
  esoSkillId: 118008,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
