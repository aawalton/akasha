import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveGlazeObject = {
  id: "01a0e9f2-f147-77d3-a611-ce33d6b45eb4",
  type: "page-type/world-spell",
  slug: "super-supportive-glaze-object",
  title: "Glaze Object",
  world: "world/super-supportive",
  description: "An Adjuster spell that coats a targeted object completely in ice.",
} as const satisfies WorldSpell
