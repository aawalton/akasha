import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVQuests = {
  id: "01a0e9fc-578b-78fe-a4c4-f942b238fd17",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-quests",
  title: "Quests",
  world: "world/ends-of-magic",
  aliases: ["Quest", "New Quest"],
  description: "A task with a stated reward.",
} as const satisfies WorldMechanic
