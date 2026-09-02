import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const solarDisturbance = {
  id: "01a05fda-9352-7eea-a80b-0646c5cefadd",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "solar-disturbance",
  title: "Solar Disturbance",
  descriptionTemplate:
    "Call down a fragment of the sun, dealing $1 Magic Damage every 1 second for 8 seconds to enemies in the area and applying Major Maim to them for 10 seconds, reducing their damage done by 10%.\n\nAn ally near the fragment can activate the Supernova synergy, dealing $2 Magic Damage to all enemies in the area and stunning them for 3 seconds.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
