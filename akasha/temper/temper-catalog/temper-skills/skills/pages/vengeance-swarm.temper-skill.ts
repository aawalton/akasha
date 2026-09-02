import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceSwarm = {
  id: "01a05fd2-1e8b-7fd0-914d-57ecc7f6640f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-swarm",
  title: "Vengeance Swarm",
  key: "vengeance-swarm",
  baseName: "Vengeance Swarm",
  description:
    '"Unleash a swarm of fetcherflies to relentlessly attack an enemy, dealing |cffffff17010|r Magic Damage over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_warden_014.dds",
  esoSkillId: 238016,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-animal-companions",
  skillType: "active",
  subcategoryId: "vengeance-warden-animal-companions",
} as const satisfies TemperSkill
