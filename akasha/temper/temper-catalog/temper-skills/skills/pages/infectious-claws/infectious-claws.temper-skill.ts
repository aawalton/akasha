import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const infectiousClaws = {
  id: "019e6f53-a372-76d7-90a4-d335d351ba9f",
  pageTypeSlug: "temper-skill",
  slug: "infectious-claws",
  title: "Rending Claws",
  key: "infectious-claws",
  baseName: "Rending Claws",
  description:
    '"Shred up to |cffffff6|r enemies in front of you with wild abandon, dealing |cffffff6474|r Physical Damage and an additional |cffffff11555|r Bleed Damage over |cffffff10|r seconds. Reduced to |cffffff6933|r Bleed Damage over |cffffff6|r seconds against players.\\n\\nThe initial hit has a |cffffff15|r% chance of applying Sundered, while the damage over time has a |cffffff5|r% chance of applying Hemorrhaging."',
  icon: "/esoui/art/icons/u50_ability_werewolf_raking_claws.dds",
  esoSkillId: 58855,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 9,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
