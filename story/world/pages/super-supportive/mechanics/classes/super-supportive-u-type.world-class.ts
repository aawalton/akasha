import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveUType = {
  id: "01a0e9f2-9e34-71fd-9898-a27db23f9010",
  type: "page-type/world-class",
  slug: "super-supportive-u-type",
  title: "U-type",
  world: "world/super-supportive",
  aliases: ["U-class", "Unique", "U"],
  description: "A class of one-of-a-kind powers that don't fit the normal classes.",
} as const satisfies WorldClass
