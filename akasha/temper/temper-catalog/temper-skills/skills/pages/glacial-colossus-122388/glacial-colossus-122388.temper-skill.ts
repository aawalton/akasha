import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const glacialColossus122388 = {
  id: "01a05fd0-dc9e-743b-bf0d-f8436349005d",
  pageTypeSlug: "temper-skill",
  slug: "glacial-colossus-122388",
  title: "Glacial Colossus",
  key: "glacial-colossus-122388",
  baseName: "Frozen Colossus",
  description:
    '"Unleash a frostbitten Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over |cffffff3|r seconds, dealing |cffffff11379|r Frost Damage with each smash. The final smash stuns all enemies hit for |cffffff4|r seconds.\\n\\nDealing damage applies Major Vulnerability to any enemy hit for |cffffff17|r seconds, increasing their damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_necromancer_006_a.dds",
  esoSkillId: 122388,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "ultimate",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
