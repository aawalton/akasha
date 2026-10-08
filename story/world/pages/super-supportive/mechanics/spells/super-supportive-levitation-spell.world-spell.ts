import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveLevitationSpell = {
  id: "01a0e9f8-aa22-75ba-8738-3a3e7131b567",
  type: "page-type/world-spell",
  slug: "super-supportive-levitation-spell",
  title: "Levitation spell",
  world: "world/super-supportive",
  aliases: ["wand of levitation", "pane of lift"],
  description: "A spell that lifts objects or people a little way into the air.",
  createdAt: "2026-09-28T21:43:02.946Z",
  updatedAt: "2026-09-28T21:43:06.000Z",
} as const satisfies WorldSpell
