import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cleave = {
  id: "01a05fd0-4398-7aca-aa9f-183f2cf070ed",
  pageTypeSlug: "temper-skill",
  slug: "cleave",
  title: "Cleave",
  key: "cleave",
  baseName: "Cleave",
  description:
    '"Focus your strength into a mighty swing, dealing |cffffff6400|r Physical Damage to enemies in front of you.\\n\\nYou also gain a damage shield that absorbs |cffffff6177|r damage for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_002.dds",
  esoSkillId: 20919,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
