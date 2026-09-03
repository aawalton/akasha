import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const siphoningAttacks36935 = {
  id: "019e6f53-a72a-77d2-b91e-e21809fd3129",
  pageTypeSlug: "temper-skill",
  slug: "siphoning-attacks-36935",
  title: "Siphoning Attacks",
  key: "siphoning-attacks-36935",
  baseName: "Siphoning Strikes",
  description:
    '"Channel a portion of your soul to convert Health to |cffffff2600|r Magicka and Stamina.\\n\\nWhile slotted on either bar, your soul yearns for the warmth of life. All damage you deal heals you for |cffffff1275|r Health and restores |cffffff200|r Magicka and Stamina, up to once every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_nightblade_003_b.dds",
  esoSkillId: 36935,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
