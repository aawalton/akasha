import type { TemperSkill } from "../temper-skill.page-type.ts"

export const pestilentColossus122395 = {
  id: "01a05fd1-2e10-7fd8-b7c8-86f0b32c42ce",
  pageTypeSlug: "temper-skill",
  slug: "pestilent-colossus-122395",
  title: "Pestilent Colossus",
  key: "pestilent-colossus-122395",
  baseName: "Frozen Colossus",
  description:
    '"Unleash a pestilent Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over |cffffff3|r seconds, dealing |cffffff11754|r, |cffffff12342|r, and |cffffff12958|r Disease Damage with the first, second, and third smash.\\n\\nDealing damage applies the Diseased status effect and Major Vulnerability to any enemy hit for |cffffff12|r seconds, increasing their damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_necromancer_006_b.dds",
  esoSkillId: 122395,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "ultimate",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
