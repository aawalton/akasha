import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceArcanistSDomain = {
  id: "019e6f53-a8b1-7436-89f9-1af2d4940893",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-arcanist-s-domain",
  title: "Vengeance Arcanist's Domain",
  key: "vengeance-arcanist-s-domain",
  baseName: "Vengeance Arcanist's Domain",
  description:
    '"Draw forth your tome and invoke the vigoratum of Hermaeus Mora to conjure a vortex of eldritch power. You or up to 3 nearby allies gain Minor Berserk, Minor Fortitude, Minor Intellect, and Minor Endurance for |cffffff20|r seconds, increasing your damage done by |cffffff5|r% and your Health, Magicka, and Stamina Recovery by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_arcanist_017.dds",
  esoSkillId: 238539,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-curative-runeforms",
} as const satisfies TemperSkill
