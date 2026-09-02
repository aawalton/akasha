import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceOfEldritchHorror = {
  id: "01a05fd2-1e7a-78ef-ac92-ad240f4051e3",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-of-eldritch-horror",
  title: "Vengeance of Eldritch Horror",
  key: "vengeance-of-eldritch-horror",
  baseName: "Vengeance of Eldritch Horror",
  description:
    '"Etch an incomprehensible rune on your enemy\'s mind, paralyzing them in fear after a |cffffff1|r second delay, stunning them for |cffffff4|r seconds. This terror applies Minor Vulnerability for |cffffff10|r seconds, increasing their damage taken by |cffffff5|r%.\\n\\nThis ability cannot be dodged."',
  icon: "/esoui/art/icons/ability_arcanist_011.dds",
  esoSkillId: 238267,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
