import type { TemperSkill } from "../temper-skill.page-type.ts"

export const spellOrb103819 = {
  id: "01a05fd1-7cd9-7f02-a99b-9e060a889f2d",
  pageTypeSlug: "temper-skill",
  slug: "spell-orb-103819",
  title: "Spell Orb",
  key: "spell-orb-103819",
  baseName: "Spell Orb",
  description:
    '"When you cast a Psijic Order ability while you are in combat, you generate a spell charge for |cffffff10|r seconds. When you reach |cffffff5|r spell charges, you launch a spell orb at the closest enemy to you dealing |cffffff1954|r Magic Damage.\\n\\nThis effect scales off your highest offensive stats."',
  icon: "/esoui/art/icons/ability_psijic_009.dds",
  esoSkillId: 103819,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-psijic-order",
  skillType: "passive",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
