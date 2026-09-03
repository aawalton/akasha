import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mirage = {
  id: "019e6245-a6d0-7870-a468-414df82770c1",
  pageTypeSlug: "temper-skill",
  slug: "mirage",
  title: "Mirage",
  key: "mirage",
  baseName: "Blur",
  description:
    '"Surround yourself in a phantasmic aura to gain Major Evasion and Minor Resolve, reducing damage from area attacks by 20% and increasing your Physical and Spell Resistance by 2974 for 20 seconds.\\n\\nWhile active, taking direct damage reduces the cost of your next Roll Dodge by 10%, up to a maximum of 100%. This effect can stack up to once every half second."',
  icon: "/esoui/art/icons/ability_nightblade_009_a.dds",
  esoSkillId: 35916,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
