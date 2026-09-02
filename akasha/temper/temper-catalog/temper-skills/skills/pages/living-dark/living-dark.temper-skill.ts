import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const livingDark = {
  id: "01a05fd1-2de9-7e42-b4e6-a20d033362c5",
  pageTypeSlug: "temper-skill",
  slug: "living-dark",
  title: "Living Dark",
  key: "living-dark",
  baseName: "Eclipse",
  description:
    '"Envelop yourself in a lightless sphere for 10 seconds to protect yourself. Anytime you take direct damage, the sphere lashes back at the attacker, reducing their Movement Speed by 40% for 3 seconds and healing you for 2066 Health. These effects can occur once every half second."',
  icon: "/esoui/art/icons/ability_templar_unstable_core.dds",
  esoSkillId: 27324,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
