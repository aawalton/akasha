import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVQuests = {
  id: "01a0e9fc-578b-78fe-a4c4-f942b238fd17",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-quests",
  title: "Quests",
  world: "world/ends-of-magic",
  aliases: ["Quest", "New Quest"],
  description: "A task with a stated reward.",
  createdAt: "2026-09-28T21:47:03.947Z",
  updatedAt: "2026-09-28T21:49:02.000Z",
} as const satisfies WorldMechanic
