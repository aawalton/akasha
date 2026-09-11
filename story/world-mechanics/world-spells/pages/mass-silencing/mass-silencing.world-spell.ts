import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massSilencing = {
  id: "01a06572-95d2-7da7-af42-841adb2c320f",
  type: "world-spell",
  slug: "mass-silencing",
  title: "Mass Silencing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
