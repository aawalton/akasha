import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveHauntingSphere = {
  id: "01a0e9f2-f147-7279-9193-808c5ecf3e0a",
  type: "page-type/world-spell",
  slug: "super-supportive-haunting-sphere",
  title: "Haunting Sphere",
  world: "world/super-supportive",
  aliases: ["The Haunting Sphere"],
  description: "A D-rank spell impression that makes a temper sphere turn invisible and scream.",
} as const satisfies WorldSpell
