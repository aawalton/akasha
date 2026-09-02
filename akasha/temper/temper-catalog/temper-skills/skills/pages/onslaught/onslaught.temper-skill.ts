import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const onslaught = {
  id: "01a05fd1-2e09-7b12-bf42-392738e463a3",
  pageTypeSlug: "temper-skill",
  slug: "onslaught",
  title: "Onslaught",
  key: "onslaught",
  baseName: "Berserker Strike",
  description:
    '"Strike at an enemy with a vicious blow, dealing 3485 Physical Damage to them and all nearby enemies.\\n\\nThis attack ignores the target\'s Resistance and grants you Physical and Spell Penetration for your direct damage attacks equal to 100% of the amount ignored from the initial target for 5 seconds."',
  icon: "/esoui/art/icons/ability_2handed_006_a.dds",
  esoSkillId: 86284,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-two-handed",
  skillType: "ultimate",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
