import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpInfest = {
  id: "019e6484-3898-7f67-a1f6-639538025c3e",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-infest",
  key: "sharp-infest",
  title: "Infest",
  icon: "/esoui/art/icons/ability_companion_warden_swarm.dds",
  description:
    "Your Companion provokes a cloud of fetcherflies to swarm an enemy, dealing $1 Magic Damage over $$1 seconds. The fetcherflies rip through the enemy's flesh, afflicting them with Minor Vulnerability for the duration, increasing their damage taken by 5%.",
  companionId: "sharp-as-night",
  abilityId: 186485,
  skillLineId: "companion-sharp-as-night-beasts-of-the-hunt",
  skillType: "active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
