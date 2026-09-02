import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const radiantOppression = {
  id: "01a05fda-9351-7530-898d-2da6f19aad86",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "radiant-oppression",
  title: "Radiant Oppression",
  descriptionTemplate:
    "Burn an enemy with a ray of holy fire, dealing $1 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 40% Health.\n\nThis ability is considered direct damage.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
