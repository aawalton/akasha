import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const powerOfTheLight = {
  id: "01a05fda-9351-7f2f-a6fa-e59bec3af8ae",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "power-of-the-light",
  title: "Power of the Light",
  descriptionTemplate:
    "Summon an expanding beam of pure sunlight to doom an enemy, dealing $1 Physical Damage immediately and marking them for 6 seconds.\n\nAfter the duration ends, the sunlight bursts, dealing $2 Physical Damage to the enemy, which increases based on the amount of damage you dealt to them over the duration, up to 200%.\n\nYou can have only one Power of the Light active at a time, and each hit of the ability applies the Sundered status effect.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
