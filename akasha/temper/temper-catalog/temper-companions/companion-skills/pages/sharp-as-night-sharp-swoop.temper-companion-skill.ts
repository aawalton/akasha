import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpSwoop = {
  id: "019e6484-38a0-72c9-9788-01c8c9509eea",
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
