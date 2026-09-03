import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const growingSwarm = {
  id: "019e6245-a699-7c6f-948b-096a1dca339a",
  pageTypeSlug: "temper-skill",
  slug: "growing-swarm",
  title: "Growing Swarm",
  key: "growing-swarm",
  baseName: "Swarm",
  description:
    '"Unleash a swarm of fetcherflies to relentlessly attack an enemy, causing them to bleed for 4785 Bleed Damage over 20 seconds. \\n\\nThe fetcherflies rip through the original enemy\'s flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by 5%.\\n\\nEnemies near the carrier take 435 Bleed Damage every 2 seconds for the duration.\\n\\nYou can only have one Growing Swarm active at a time."',
  icon: "/esoui/art/icons/ability_warden_014_b.dds",
  esoSkillId: 86034,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
