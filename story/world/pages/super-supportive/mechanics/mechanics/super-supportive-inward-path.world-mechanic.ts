import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveInwardPath = {
  id: "01a0e9f9-1fa2-7913-a180-1056fcc0db5b",
  type: "page-type/world-mechanic",
  slug: "super-supportive-inward-path",
  title: "the inward path",
  world: "world/super-supportive",
  aliases: ["the weight", "steeping"],
  description: "A dug maze of open corridors behind a House of Healing.",
} as const satisfies WorldMechanic
