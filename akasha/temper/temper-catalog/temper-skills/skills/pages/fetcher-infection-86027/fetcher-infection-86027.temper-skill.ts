import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fetcherInfection86027 = {
  id: "01a05fd0-dc8b-7d8a-888a-a46d8ef58287",
  pageTypeSlug: "temper-skill",
  slug: "fetcher-infection-86027",
  title: "Fetcher Infection",
  key: "fetcher-infection-86027",
  baseName: "Swarm",
  description:
    '"Unleash a swarm of fetcherflies to relentlessly attack an enemy, dealing |cffffff15730|r Magic Damage over |cffffff20|r seconds.\\n\\nEvery second cast of this ability deals |cffffff60|r% increased damage.\\n\\nThe fetcherflies rip through the enemy\'s flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_warden_014_a.dds",
  esoSkillId: 86027,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
