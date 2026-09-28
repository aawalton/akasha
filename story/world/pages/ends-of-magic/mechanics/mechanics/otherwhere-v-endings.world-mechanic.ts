import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVEndings = {
  id: "01a0e9fb-666b-79e0-9afd-73dce250be43",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-endings",
  title: "Endings",
  world: "world/ends-of-magic",
  aliases: ["Ending"],
  description: "A world-wide catastrophe that returns to Davrar across the ages.",
} as const satisfies WorldMechanic
