import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceLightningSplash = {
  id: "019e6f53-a931-7f72-a75b-5d91bde5858a",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-lightning-splash",
  title: "Vengeance Lightning Splash",
  key: "vengeance-lightning-splash",
  baseName: "Vengeance Lightning Splash",
  description:
    '"Create a nexus of storm energy at the target location, dealing |cffffff9701|r Shock Damage to up to 3 enemies in the area."',
  icon: "/esoui/art/icons/ability_sorcerer_lightning_splash.dds",
  esoSkillId: 237959,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-storm-calling",
} as const satisfies TemperSkill
