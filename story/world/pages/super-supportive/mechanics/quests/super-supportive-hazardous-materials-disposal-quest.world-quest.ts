import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"

export const superSupportiveHazardousMaterialsDisposalQuest = {
  id: "01a0e9f0-79f4-7153-a6a7-fac0d9d2f626",
  type: "page-type/world-quest",
  slug: "super-supportive-hazardous-materials-disposal-quest",
  title: "Hazardous Materials Disposal for LeafSong University",
  world: "world/super-supportive",
  description: "A quest to dispose of hazardous exam lab materials at LeafSong University.",
} as const satisfies WorldQuest
