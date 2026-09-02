import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalRing39143 = {
  id: "01a05fd0-8e17-7f8b-b18e-51812959105f",
  pageTypeSlug: "temper-skill",
  slug: "elemental-ring-39143",
  title: "Elemental Ring",
  key: "elemental-ring-39143",
  baseName: "Impulse",
  description:
    '"Release a surge of elemental energy, dealing |cffffff6611|r Magic Damage to enemies at the target location.\\n\\nFire Ring hits Burning enemies with Ring Afterburn, which deals more damage based on their missing Health.\\n\\nFrost Ring also provides Minor Protection.\\n\\nShock Ring\'s damage increases based on the number of enemies hit."',
  icon: "/esoui/art/icons/ability_destructionstaff_008_a.dds",
  esoSkillId: 39143,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 38,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
