import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceBacklash = {
  id: "01a05fd1-d288-7283-89ee-85eded3e21d1",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-backlash",
  title: "Vengeance Backlash",
  key: "vengeance-backlash",
  baseName: "Vengeance Backlash",
  description:
    '"Summon an expanding beam of pure sunlight to doom an enemy for |cffffff6|r seconds, dealing |cffffff5141|r Magic Damage immediately and |cffffff15423|r Magic Damage after the duration ends.\\n\\nThe final hit of damage cannot be dodged."',
  icon: "/esoui/art/icons/ability_templar_backlash.dds",
  esoSkillId: 237957,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "vengeance-templar-dawns-wrath",
} as const satisfies TemperSkill
