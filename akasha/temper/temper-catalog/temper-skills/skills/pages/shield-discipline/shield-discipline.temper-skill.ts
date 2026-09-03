import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shieldDiscipline = {
  id: "019e6226-0112-7258-9b80-cb29c645723c",
  pageTypeSlug: "temper-skill",
  slug: "shield-discipline",
  title: "Shield Discipline",
  key: "shield-discipline",
  baseName: "Shield Wall",
  description:
    '"Reinforce your shield, allowing you to automatically block all attacks at no cost for 8 seconds.\\n\\nYour One Hand and Shield non-Ultimate abilities cost nothing while this effect persists."',
  icon: "/esoui/art/icons/ability_1handed_006_b.dds",
  esoSkillId: 86345,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "ultimate",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
