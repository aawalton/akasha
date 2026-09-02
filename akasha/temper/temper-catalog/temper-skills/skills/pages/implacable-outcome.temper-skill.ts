import type { TemperSkill } from "../temper-skill.page-type.ts"

export const implacableOutcome = {
  id: "01a05fd0-dcc1-7090-84e0-706a9cbe495e",
  pageTypeSlug: "temper-skill",
  slug: "implacable-outcome",
  title: "Implacable Outcome",
  key: "implacable-outcome",
  baseName: "Implacable Outcome",
  description:
    '"The will of an Arcanist is absolute. When you consume Crux, gain 4 Ultimate. This effect can occur once every 8 seconds."',
  icon: "/esoui/art/icons/passive_arcanist_08.dds",
  esoSkillId: 185058,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "passive",
  subcategoryId: "arcanist-soldier-of-apocrypha",
  status: "unsupported",
} as const satisfies TemperSkill
