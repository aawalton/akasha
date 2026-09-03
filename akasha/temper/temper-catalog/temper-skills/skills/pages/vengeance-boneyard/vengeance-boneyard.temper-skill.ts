import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBoneyard = {
  id: "019e6f53-a8cb-7ffc-ac4b-3b5405a72e96",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-boneyard",
  title: "Vengeance Boneyard",
  key: "vengeance-boneyard",
  baseName: "Vengeance Boneyard",
  description:
    '"Desecrate the ground at the target location, dealing |cffffff8820|r Frost Damage to up to 3 enemies inside and applying Minor Vulnerability for |cffffff5|r seconds, increasing their damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_necromancer_004.dds",
  esoSkillId: 238095,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-grave-lord",
} as const satisfies TemperSkill
