import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massSilencing = {
  id: "01a06572-95d2-7da7-af42-841adb2c320f",
  type: "page-type/world-spell",
  slug: "mass-silencing",
  title: "Mass Silencing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
