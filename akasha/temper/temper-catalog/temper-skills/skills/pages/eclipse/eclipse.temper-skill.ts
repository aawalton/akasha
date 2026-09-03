import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const eclipse = {
  id: "019e6f53-a104-77a2-93fd-bdccec0c61d0",
  pageTypeSlug: "temper-skill",
  slug: "eclipse",
  title: "Eclipse",
  key: "eclipse",
  baseName: "Eclipse",
  description:
    '"Envelop an enemy in a lightless sphere for |cffffff4|r seconds, that harms them with growing intensity anytime they use a direct damage attack. Limited to one.\\n\\nTheir first attack reduces their Movement Speed by |cffffff30|r% for |cffffff4|r seconds, their second attack immobilizes them for |cffffff3|r seconds, and their third attack stuns them for |cffffff3|r seconds. The effects can activate once every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_templar_eclipse.dds",
  esoSkillId: 21776,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
