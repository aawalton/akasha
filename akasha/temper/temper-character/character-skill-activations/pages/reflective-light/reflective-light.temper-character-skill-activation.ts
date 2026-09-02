import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const reflectiveLight = {
  id: "01a05fda-9352-7d2f-a4cf-36ee3845621e",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "reflective-light",
  title: "Reflective Light",
  descriptionTemplate:
    "Blast up to three enemies with a charge of radiant heat, dealing $1 Flame Damage, an additional $2 Flame Damage over 20 seconds, and reducing their Movement Speed by 40% for 3 seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
