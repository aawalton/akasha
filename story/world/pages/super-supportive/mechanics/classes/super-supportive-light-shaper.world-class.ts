import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveLightShaper = {
  id: "01a0e9f2-30df-73f3-a287-7a40a441da77",
  type: "page-type/world-class",
  slug: "super-supportive-light-shaper",
  title: "Shaper of Light",
  world: "world/super-supportive",
  aliases: ["light Shaper", "Light Shaper"],
  description: "A Shaper subclass that shapes light.",
} as const satisfies WorldClass
