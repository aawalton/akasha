import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVPaths = {
  id: "01a0ea00-21ae-778d-8c6a-a926f99b1f7a",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-paths",
  title: "Paths",
  world: "world/ends-of-magic",
  aliases: ["Path", "Path of Faith"],
  description: "A named line of power a person commits to.",
} as const satisfies WorldMechanic
