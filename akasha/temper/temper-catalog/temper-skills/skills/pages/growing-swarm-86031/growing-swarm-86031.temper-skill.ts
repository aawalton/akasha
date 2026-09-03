import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const growingSwarm86031 = {
  id: "019e6f53-a2bf-70ee-99f6-964f9ff360fa",
  pageTypeSlug: "temper-skill",
  slug: "growing-swarm-86031",
  title: "Growing Swarm",
  key: "growing-swarm-86031",
  baseName: "Swarm",
  description:
    '"Unleash a swarm of fetcherflies to relentlessly attack an enemy, causing them to bleed for |cffffff15730|r Bleed Damage over |cffffff20|r seconds. \\n\\nThe fetcherflies rip through the original enemy\'s flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by |cffffff5|r%.\\n\\nEnemies near the carrier take |cffffff1516|r Bleed Damage every |cffffff2|r seconds for the duration.\\n\\nYou can only have one Growing Swarm active at a time."',
  icon: "/esoui/art/icons/ability_warden_014_b.dds",
  esoSkillId: 86031,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
