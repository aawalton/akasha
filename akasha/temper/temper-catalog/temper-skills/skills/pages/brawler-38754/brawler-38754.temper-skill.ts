import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const brawler38754 = {
  id: "01a05fd0-437f-7030-a85f-2cdbb31874c3",
  pageTypeSlug: "temper-skill",
  slug: "brawler-38754",
  title: "Brawler",
  key: "brawler-38754",
  baseName: "Cleave",
  description:
    '"Focus your strength into a mighty swing, dealing |cffffff6401|r Physical Damage to enemies in front of you.\\n\\nYou also gain a damage shield that absorbs |cffffff6381|r damage for |cffffff6|r seconds. Each enemy hit increases the damage shield\'s strength by |cffffff50|r%, up to |cffffff300|r%."',
  icon: "/esoui/art/icons/ability_2handed_002_b.dds",
  esoSkillId: 38754,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 14,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
