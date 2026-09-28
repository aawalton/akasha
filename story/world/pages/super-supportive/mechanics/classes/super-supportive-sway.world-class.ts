import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveSway = {
  id: "01a0e9f1-6aac-789b-9e3e-2d4e4a7149ae",
  type: "page-type/world-class",
  slug: "super-supportive-sway",
  title: "Sway",
  world: "world/super-supportive",
  aliases: ["mind controller"],
  description: "The mind-control class.",
} as const satisfies WorldClass
