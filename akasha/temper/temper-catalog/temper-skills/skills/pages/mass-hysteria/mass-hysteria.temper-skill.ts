import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const massHysteria = {
  id: "019e6245-a6c9-7ebc-8947-d498e132b2e4",
  pageTypeSlug: "temper-skill",
  slug: "mass-hysteria",
  title: "Mass Hysteria",
  key: "mass-hysteria",
  baseName: "Aspect of Terror",
  description:
    '"Summon a dark spirit to terrify all nearby enemies, causing them to cower in fear for 3 seconds and be afflicted with Major Cowardice for 10 seconds, reducing their Weapon and Spell Damage by 430."',
  icon: "/esoui/art/icons/ability_nightblade_016_a.dds",
  esoSkillId: 38075,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
