import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wallOfElements = {
  id: "019e6f53-a9d2-763a-98d1-71646bafa204",
  pageTypeSlug: "temper-skill",
  slug: "wall-of-elements",
  title: "Wall of Elements",
  key: "wall-of-elements",
  baseName: "Wall of Elements",
  description:
    '"Slam your staff down to create an elemental barrier in front of you, dealing |cffffff977|r Magic Damage to enemies in the target area every |cffffff1|r second.\\n\\nWall of Fire deals additional damage to Burning enemies.\\n\\nWall of Frost costs more, but snares and reduces armor against Chilled enemies and grants damage shields.\\n\\nWall of Storms sets Concussed enemies Off Balance."',
  icon: "/esoui/art/icons/ability_destructionstaff_002.dds",
  esoSkillId: 28858,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
