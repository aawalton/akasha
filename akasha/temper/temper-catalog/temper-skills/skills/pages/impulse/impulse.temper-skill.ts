import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const impulse = {
  id: "019e6f53-a369-7a2b-a86f-71b0d6f9db45",
  pageTypeSlug: "temper-skill",
  slug: "impulse",
  title: "Impulse",
  key: "impulse",
  baseName: "Impulse",
  description:
    '"Release a surge of elemental energy, dealing |cffffff6400|r Magic Damage to nearby enemies.\\n\\nFire Impulse hits Burning enemies with Impulse Afterburn, which deals more damage based on their missing Health.\\n\\nFrost Impulse also provides Minor Protection.\\n\\nShock Impulse\'s damage increases based on the number of enemies hit."',
  icon: "/esoui/art/icons/ability_destructionstaff_008.dds",
  esoSkillId: 28800,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
