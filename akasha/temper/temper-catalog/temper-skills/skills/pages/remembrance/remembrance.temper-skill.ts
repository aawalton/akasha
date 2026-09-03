import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const remembrance = {
  id: "019e6245-a708-7756-858e-39936e3d650f",
  pageTypeSlug: "temper-skill",
  slug: "remembrance",
  title: "Remembrance",
  key: "remembrance",
  baseName: "Rite of Passage",
  description:
    '"Channel the grace of the gods, healing you and nearby allies for 2788 Health every 1 second for 4 seconds.\\n\\nGain Major Protection, reducing damage you take by 10% for 10 seconds.\\n\\nYou cannot move while channeling, but you gain immunity to all disabling effects."',
  icon: "/esoui/art/icons/ability_templar_remembrance.dds",
  esoSkillId: 27413,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-restoring-light",
  skillType: "ultimate",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
