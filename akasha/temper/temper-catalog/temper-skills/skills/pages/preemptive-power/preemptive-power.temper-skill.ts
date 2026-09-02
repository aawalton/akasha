import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const preemptivePower = {
  id: "01a05fd1-2e1c-7ad0-9c4c-413b655f53b4",
  pageTypeSlug: "temper-skill",
  slug: "preemptive-power",
  title: "Preemptive Power",
  key: "preemptive-power",
  baseName: "Preemptive Power",
  description: '"Start each Scrying attempt with an additional row of facets already claimed."',
  icon: "/esoui/art/icons/ability_scrying_09.dds",
  esoSkillId: 139777,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
