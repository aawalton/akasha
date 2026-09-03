import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pestilentColossus = {
  id: "019e6245-a6e1-7ba0-b050-d71e5b838cbc",
  pageTypeSlug: "temper-skill",
  slug: "pestilent-colossus",
  title: "Pestilent Colossus",
  key: "pestilent-colossus",
  baseName: "Frozen Colossus",
  description:
    '"Unleash a pestilent Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over 3 seconds, dealing 3200, 3360, and 3528 Disease Damage with the first, second, and third smash.\\n\\nDealing damage applies the Diseased status effect and Major Vulnerability to any enemy hit for 12 seconds, increasing their damage taken by 10%."',
  icon: "/esoui/art/icons/ability_necromancer_006_b.dds",
  esoSkillId: 40122395,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-grave-lord",
  skillType: "ultimate",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
