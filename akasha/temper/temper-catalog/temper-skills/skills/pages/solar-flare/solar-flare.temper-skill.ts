import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const solarFlare = {
  id: "019e6f53-a74d-741b-86e0-471490092dd0",
  pageTypeSlug: "temper-skill",
  slug: "solar-flare",
  title: "Solar Flare",
  key: "solar-flare",
  baseName: "Solar Flare",
  description:
    '"Conjure a ball of solar energy to heave at an enemy, dealing |cffffff8359|r Magic Damage and increasing your damage done with class abilities by |cffffff5|r% for |cffffff10|r seconds.\\n\\nAlso grants you Empower for |cffffff10|r seconds, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r%."',
  icon: "/esoui/art/icons/ability_templar_solar_flare.dds",
  esoSkillId: 22057,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
