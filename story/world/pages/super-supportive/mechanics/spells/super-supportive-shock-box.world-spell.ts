import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveShockBox = {
  id: "01a0e9f7-9e6e-745f-b3c8-f98705fbbf06",
  type: "page-type/world-spell",
  slug: "super-supportive-shock-box",
  title: "Shock Box",
  world: "world/super-supportive",
  aliases: ["shock trap", "electrocution trap"],
  description: "An Adjuster trap of electricity.",
} as const satisfies WorldSpell
