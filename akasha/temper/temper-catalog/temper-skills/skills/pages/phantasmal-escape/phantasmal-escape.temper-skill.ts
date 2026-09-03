import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const phantasmalEscape = {
  id: "019e6245-a6e2-7e53-a1ba-7dcafebabfd3",
  pageTypeSlug: "temper-skill",
  slug: "phantasmal-escape",
  title: "Phantasmal Escape",
  key: "phantasmal-escape",
  baseName: "Blur",
  description:
    '"Surround yourself in a phantasmic aura to gain Major Evasion, reducing damage from area attacks by 20% for 20 seconds.\\n\\nActivating this ability removes all snares and immobilizations from you and grants immunity to them for 4 seconds.\\n\\nWhile active, taking direct damage reduces the cost of your next Roll Dodge by 10%, up to a maximum of 100%. This effect can stack up to once every half second."',
  icon: "/esoui/art/icons/ability_nightblade_009_b.dds",
  esoSkillId: 35924,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
