import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const livingDark22006 = {
  id: "019e6f53-a410-7169-8c91-a809e0cb1f2f",
  pageTypeSlug: "temper-skill",
  slug: "living-dark-22006",
  title: "Living Dark",
  key: "living-dark-22006",
  baseName: "Eclipse",
  description:
    '"Envelop yourself in a lightless sphere for |cffffff10|r seconds to protect yourself. Anytime you take direct damage, the sphere lashes back at the attacker, reducing their Movement Speed by |cffffff40|r% for |cffffff3|r seconds and healing you for |cffffff2107|r Health. These effects can occur once every half second."',
  icon: "/esoui/art/icons/ability_templar_unstable_core.dds",
  esoSkillId: 22006,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
