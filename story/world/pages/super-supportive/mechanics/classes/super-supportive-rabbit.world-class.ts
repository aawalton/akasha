import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveRabbit = {
  id: "01a0e9f2-9e34-702b-b46d-435270c741f4",
  type: "page-type/world-class",
  slug: "super-supportive-rabbit",
  title: "Rabbit",
  world: "world/super-supportive",
  aliases: ["Ryeh-b't", "Rhye-b't", "errand-runner class"],
  description:
    "A rare noncombat class of magical errand-runners and helpers, summoned more often than any other class.",
} as const satisfies WorldClass
