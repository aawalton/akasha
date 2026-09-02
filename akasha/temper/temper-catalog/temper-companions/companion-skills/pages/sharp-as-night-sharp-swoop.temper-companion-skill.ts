import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpSwoop = {
  id: "01a05fd0-1d84-72a7-aeaf-89b84c7bd074",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-swoop",
  key: "sharp-swoop",
  title: "Swoop",
  icon: "/esoui/art/icons/ability_companion_warden_dive.dds",
  description:
    "Your Companion commands a cliff racer to dive bomb an enemy, dealing $1 Magic Damage. If they are more than 7 meters away from the target, they set them Off Balance for $$2 seconds.",
  companionId: "sharp-as-night",
  abilityId: 186056,
  skillLineId: "companion-sharp-as-night-beasts-of-the-hunt",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
