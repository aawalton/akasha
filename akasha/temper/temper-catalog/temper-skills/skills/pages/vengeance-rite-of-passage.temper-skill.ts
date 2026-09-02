import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceRiteOfPassage = {
  id: "01a05fd2-1e82-7f04-adf5-d9dabffd7797",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-rite-of-passage",
  title: "Vengeance Rite of Passage",
  key: "vengeance-rite-of-passage",
  baseName: "Vengeance Rite of Passage",
  description:
    '"Channel the grace of the gods, healing you or 3 nearby allies for |cffffff12852|r Health every |cffffff1|r second for |cffffff3|r seconds.\\n\\nWhile channeling this ability you gain immunity to all disabling effects."',
  icon: "/esoui/art/icons/ability_templar_rite_of_passage.dds",
  esoSkillId: 237994,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-restoring-light",
  skillType: "ultimate",
  subcategoryId: "vengeance-templar-restoring-light",
} as const satisfies TemperSkill
