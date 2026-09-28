import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"

export const superSupportiveGalaWaitstaffQuest = {
  id: "01a0e9f0-79f4-7343-a939-474e2261a7ce",
  type: "page-type/world-quest",
  slug: "super-supportive-gala-waitstaff-quest",
  title: "Waitstaff at the Achievement Society Gala",
  world: "world/super-supportive",
  description:
    "A quest to wait tables at a LeafSong gala for faculty, student prospects and families.",
} as const satisfies WorldQuest
