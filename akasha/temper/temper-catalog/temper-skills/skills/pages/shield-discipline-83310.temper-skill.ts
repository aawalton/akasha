import type { TemperSkill } from "../temper-skill.page-type.ts"

export const shieldDiscipline83310 = {
  id: "01a05fd1-7cbe-7765-8ae3-1fd8cf1d416b",
  pageTypeSlug: "temper-skill",
  slug: "shield-discipline-83310",
  title: "Shield Discipline",
  key: "shield-discipline-83310",
  baseName: "Shield Wall",
  description:
    '"Reinforce your shield, allowing you to automatically block all attacks at no cost for |cffffff8|r seconds.\\n\\nYour One Hand and Shield non-Ultimate abilities cost nothing while this effect persists."',
  icon: "/esoui/art/icons/ability_1handed_006_b.dds",
  esoSkillId: 83310,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 50,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "ultimate",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
