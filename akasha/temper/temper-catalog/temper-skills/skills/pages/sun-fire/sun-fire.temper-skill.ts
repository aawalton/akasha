import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sunFire = {
  id: "019e6f53-a7f2-7ff9-882e-8dbf1cd891cb",
  pageTypeSlug: "temper-skill",
  slug: "sun-fire",
  title: "Sun Fire",
  key: "sun-fire",
  baseName: "Sun Fire",
  description:
    '"Blast an enemy with a charge of radiant heat, dealing |cffffff4036|r Flame Damage, and an additional |cffffff11420|r Flame Damage over |cffffff20|r seconds.\\n\\nUpon activation you gain Major Savagery and Major Prophecy for |cffffff20|r seconds, increasing your Weapon and Spell Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_templar_sun_fire.dds",
  esoSkillId: 21726,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
