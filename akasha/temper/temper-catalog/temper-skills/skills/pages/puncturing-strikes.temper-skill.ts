import type { TemperSkill } from "../temper-skill.page-type.ts"

export const puncturingStrikes = {
  id: "01a05fd1-2e21-781d-b474-bd9691282611",
  pageTypeSlug: "temper-skill",
  slug: "puncturing-strikes",
  title: "Puncturing Strikes",
  key: "puncturing-strikes",
  baseName: "Puncturing Strikes",
  description:
    '"Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals |cffffff3270|r Magic Damage per strike and reduces enemy Movement Speed by |cffffff40|r% for |cffffff0.5|r seconds."',
  icon: "/esoui/art/icons/ability_templar_trained_attacker.dds",
  esoSkillId: 26114,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
