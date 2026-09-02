import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const arcanistSDomain = {
  id: "01a05fd0-434d-7848-921d-c3fb506d36d3",
  pageTypeSlug: "temper-skill",
  slug: "arcanist-s-domain",
  title: "Arcanist's Domain",
  key: "arcanist-s-domain",
  baseName: "Arcanist's Domain",
  description:
    '"Draw forth your tome and invoke the vigoratum of Hermaeus Mora to conjure a vortex of eldritch power. Entering this vortex grants you and your allies Minor Courage, Minor Fortitude, Minor Intellect, and Minor Endurance, increasing your Weapon and Spell Damage by |cffffff215|r and your Health, Magicka, and Stamina Recovery by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_arcanist_017.dds",
  esoSkillId: 183555,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
