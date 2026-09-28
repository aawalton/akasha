import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveMourningName = {
  id: "01a0e9f2-f0a2-7feb-a6de-84059a0e3dbe",
  type: "page-type/world-mechanic",
  slug: "super-supportive-mourning-name",
  title: "Mourning name",
  world: "world/super-supportive",
  description: "An Artonan custom of adding a dead person's name to the front of one's own.",
} as const satisfies WorldMechanic
