import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const berserkerRage83238 = {
  id: "019e6f53-9f03-7871-b8d3-36db52f1f340",
  pageTypeSlug: "temper-skill",
  slug: "berserker-rage-83238",
  title: "Berserker Rage",
  key: "berserker-rage-83238",
  baseName: "Berserker Strike",
  description:
    '"Strike at an enemy with a vicious blow, dealing |cffffff12515|r Physical Damage to them and all nearby enemies.\\n\\nThis attack ignores the target\'s Resistance and grants you Physical and Spell Resistance equal to the amount ignored from the initial target for |cffffff12|r seconds.\\n\\nYou are immune to all disabling, snare, and immobilization effects for the duration."',
  icon: "/esoui/art/icons/ability_2handed_006_b.dds",
  esoSkillId: 83238,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 50,
  skillLineId: "weapon-two-handed",
  skillType: "ultimate",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
