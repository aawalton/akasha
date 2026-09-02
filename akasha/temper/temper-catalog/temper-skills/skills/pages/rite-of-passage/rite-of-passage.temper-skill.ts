import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const riteOfPassage = {
  id: "01a05fd1-7c9c-7a86-98de-1d72d9766b07",
  pageTypeSlug: "temper-skill",
  slug: "rite-of-passage",
  title: "Rite of Passage",
  key: "rite-of-passage",
  baseName: "Rite of Passage",
  description:
    '"Channel the grace of the gods, healing you and nearby allies for |cffffff8767|r Health every |cffffff1|r second for |cffffff4|r seconds.\\n\\nYou cannot move while channeling, but you gain immunity to all disabling effects."',
  icon: "/esoui/art/icons/ability_templar_rite_of_passage.dds",
  esoSkillId: 22223,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "templar-restoring-light",
  skillType: "ultimate",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
