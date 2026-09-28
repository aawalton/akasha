import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDoubleOn = {
  id: "01a0e9f5-fded-710b-a04c-04deefac06ca",
  type: "page-type/world-mechanic",
  slug: "super-supportive-double-on",
  title: "double-on",
  world: "world/super-supportive",
  aliases: ["double-on their stats"],
  description:
    "A rare surge of power past an Avowed's stat points, brought on by a flood of adrenaline.",
} as const satisfies WorldMechanic
