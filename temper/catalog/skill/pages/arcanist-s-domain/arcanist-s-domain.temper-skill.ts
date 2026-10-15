import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const arcanistSDomain = {
  id: "019e6f53-9eba-7211-98f7-4826502f893e",
  type: "page-type/temper-skill",
  slug: "arcanist-s-domain",
  title: "Arcanist's Domain",
  key: "arcanist-s-domain",
  baseName: "Arcanist's Domain",
  description:
    "Draw forth your tome and invoke the vigoratum of Hermaeus Mora to conjure a vortex of eldritch power. Entering this vortex grants you and your allies Minor Courage, Minor Fortitude, Minor Intellect, and Minor Endurance, increasing your Weapon and Spell Damage by |cffffff215|r and your Health, Magicka, and Stamina Recovery by |cffffff15|r%.",
  icon: "/esoui/art/icons/ability_arcanist_017.dds",
  esoSkillId: 183555,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 42,
  createdAt: "2026-05-28T16:03:31.642Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Courage (Constant)",
    "<<2>> = Minor Fortitude (Constant)",
    "<<3>> = Minor Intellect (Constant)",
    "<<4>> = Minor Endurance (Constant)",
    "<<5>> = 215 (Constant)",
    "<<6>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
