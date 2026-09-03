import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spellOrb = {
  id: "019e6238-c316-7ca4-a446-558788acf1a4",
  pageTypeSlug: "temper-skill",
  slug: "spell-orb",
  title: "Spell Orb",
  key: "spell-orb",
  baseName: "Spell Orb",
  description:
    '"When you cast a Psijic Order ability while you are in combat, you generate a spell charge for 10 seconds. When you reach 5 spell charges, you launch a spell orb at the closest enemy to you dealing 1124 Magic Damage.\\n\\nThis effect scales off your highest offensive stats."',
  icon: "/esoui/art/icons/ability_psijic_009.dds",
  esoSkillId: 103878,
  isMorph: false,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-psijic-order",
  skillType: "passive",
  subcategoryId: "guild-psijic-order",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
