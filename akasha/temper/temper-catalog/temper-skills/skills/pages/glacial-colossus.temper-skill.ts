import type { TemperSkill } from "../temper-skill.page-type.ts"

export const glacialColossus = {
  id: "01a05fd0-dc9d-75c8-9328-33d7ecfacaec",
  pageTypeSlug: "temper-skill",
  slug: "glacial-colossus",
  title: "Glacial Colossus",
  key: "glacial-colossus",
  baseName: "Frozen Colossus",
  description:
    '"Unleash a frostbitten Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over 3 seconds, dealing 3098 Frost Damage with each smash. The final smash stuns all enemies hit for 4 seconds.\\n\\nDealing damage applies Major Vulnerability to any enemy hit for 17 seconds, increasing their damage taken by 10%."',
  icon: "/esoui/art/icons/ability_necromancer_006_a.dds",
  esoSkillId: 40122388,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "ultimate",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
