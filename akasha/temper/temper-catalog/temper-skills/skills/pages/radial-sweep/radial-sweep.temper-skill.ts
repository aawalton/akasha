import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radialSweep = {
  id: "01a05fd1-2e24-7461-b834-10f7ea5cba55",
  pageTypeSlug: "temper-skill",
  slug: "radial-sweep",
  title: "Radial Sweep",
  key: "radial-sweep",
  baseName: "Radial Sweep",
  description:
    '"Swing your Aedric spear around with holy vengeance, dealing |cffffff8533|r Magic Damage to all nearby enemies and an additional |cffffff4036|r Magic Damage every |cffffff2|r seconds for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_templar_radial_sweep.dds",
  esoSkillId: 22138,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "templar-aedric-spear",
  skillType: "ultimate",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
