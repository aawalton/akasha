import type { TemperSkill } from "../temper-skill.page-type.ts"

export const solarBarrage = {
  id: "01a05fd1-7ccd-7692-b358-0ddcc6024f25",
  pageTypeSlug: "temper-skill",
  slug: "solar-barrage",
  title: "Solar Barrage",
  key: "solar-barrage",
  baseName: "Solar Flare",
  description:
    '"Conjure solar energy to blast enemies around you, dealing 435 Magic Damage every 2 seconds and increasing your damage done with class abilities by 5% for 20 seconds.\\n\\nWhile this ability is active you gain Empower, increasing the damage of your Heavy Attacks against monsters by 70%."',
  icon: "/esoui/art/icons/ability_templar_solar_power.dds",
  esoSkillId: 24157,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
