import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const vampiresBane = {
  id: "01a05fda-9353-7f80-8d48-8bd5b45f12d8",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "vampires-bane",
  title: "Vampire's Bane",
  descriptionTemplate:
    "Blast an enemy with a charge of radiant heat, dealing $1 Flame Damage, and an additional $2 Flame Damage over 30 seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for 30 seconds, increasing your Weapon and Spell Critical rating by 2629.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
