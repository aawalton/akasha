import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const funnelHealth = {
  id: "019e6245-a68e-7c04-a556-3ee8ce0eb435",
  pageTypeSlug: "temper-skill",
  slug: "funnel-health",
  title: "Funnel Health",
  key: "funnel-health",
  baseName: "Strife",
  description:
    '"Steal an enemy\'s life force, dealing 1600 Magic Damage and healing you or 3 other nearby allies for 50% of the damage inflicted every 2 seconds for 10 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_012_b.dds",
  esoSkillId: 35941,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
