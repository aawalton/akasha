import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiPaths = {
  id: "01a0ea79-6f6c-728d-8a94-be327d3d0aeb",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-paths",
  title: "Paths",
  world: "world/the-calamitous-bob-stubbed",
  description: "The calling a person follows, which the interface names and builds skills around.",
  aliases: ["Classes"],
} as const satisfies WorldMechanic
