import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalBlockade39011 = {
  id: "019e6f53-a10f-7e6d-aea4-01ec1f4cd052",
  pageTypeSlug: "temper-skill",
  slug: "elemental-blockade-39011",
  title: "Elemental Blockade",
  key: "elemental-blockade-39011",
  baseName: "Wall of Elements",
  description:
    '"Slam your staff down to create an elemental barrier in front of you, dealing |cffffff978|r Magic Damage to enemies in the target area every |cffffff1|r second.\\n\\nBlockade of Fire deals additional damage to Burning enemies.\\n\\nBlockade of Frost costs more, but snares and reduces armor against Chilled enemies and grants damage shields.\\n\\nBlockade of Storms sets Concussed enemies Off Balance."',
  icon: "/esoui/art/icons/ability_destructionstaff_002a.dds",
  esoSkillId: 39011,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
