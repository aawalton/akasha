import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unstableCore = {
  id: "019e6245-a75d-787a-9722-36cefe64c366",
  pageTypeSlug: "temper-skill",
  slug: "unstable-core",
  title: "Unstable Core",
  key: "unstable-core",
  baseName: "Eclipse",
  description:
    '"Envelop an enemy in a lightless sphere for 4 seconds, that harms them with growing intensity anytime they deal direct damage. Limited to one.\\n\\nTheir first attack reduces their Movement Speed by 30% for 4 seconds and deals 449 Magic Damage, their second attack immobilizes them for 3 seconds and deals 898 Magic Damage, and their third attack stuns them for 3 seconds and deals 1799 Magic Damage. The effects can activate once every 1 second."',
  icon: "/esoui/art/icons/ability_templar_total_dark.dds",
  esoSkillId: 27311,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
