import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const purifyingLight = {
  id: "01a05fda-9351-745c-aa61-8f134f37af3a",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "purifying-light",
  title: "Purifying Light",
  descriptionTemplate:
    "Summon an expanding beam of pure sunlight to doom an enemy, dealing $1 Magic Damage immediately and marking them for 6 seconds.\n\nAfter the duration ends, the sunlight bursts, dealing $2 Magic Damage, which increases based on the amount of damage you dealt to them over the duration, up to 200%. Also heals you and nearby allies in the area for $3 Health every 2 seconds, over 10 seconds.\n\nYou can have only one Purifying Light at a time.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
