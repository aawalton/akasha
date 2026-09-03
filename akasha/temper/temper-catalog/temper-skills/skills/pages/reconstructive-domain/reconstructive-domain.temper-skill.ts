import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reconstructiveDomain = {
  id: "019e6245-a701-7078-a5d8-a363f96d4381",
  pageTypeSlug: "temper-skill",
  slug: "reconstructive-domain",
  title: "Reconstructive Domain",
  key: "reconstructive-domain",
  baseName: "Arcanist's Domain",
  description:
    '"Draw forth your tome and invoke the leviathanum of the Abyssal Sea to conjure a vortex of eldritch power. Entering this vortex grants you and your allies Minor Courage, Minor Fortitude, Minor Intellect, and Minor Endurance, increasing your Weapon and Spell Damage by 215 and your Health, Magicka, and Stamina Recovery by 15%.\\n\\nThe vortex also heals you and your allies for 4631 Health over 20 seconds."',
  icon: "/esoui/art/icons/ability_arcanist_017_b.dds",
  esoSkillId: 40186234,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
