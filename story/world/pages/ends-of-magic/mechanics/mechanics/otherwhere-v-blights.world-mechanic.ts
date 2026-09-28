import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVBlights = {
  id: "01a0e9fc-5fc8-7279-bf6c-945f211e9c4e",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-blights",
  title: "Blights",
  world: "world/ends-of-magic",
  aliases: ["blight", "corruption", "blighted lands", "corrupted zones"],
  description: "Vast lands of corrupted magic.",
} as const satisfies WorldMechanic
