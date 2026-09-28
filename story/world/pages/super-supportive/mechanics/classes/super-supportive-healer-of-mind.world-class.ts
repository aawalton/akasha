import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveHealerOfMind = {
  id: "01a0e9f2-9e34-7e83-a56e-6c43b3d9cc1b",
  type: "page-type/world-class",
  slug: "super-supportive-healer-of-mind",
  title: "Healer of Mind",
  world: "world/super-supportive",
  aliases: ["Mind Healer"],
  description: "A super-rare Healer subclass that mends the mind, including mind-control damage.",
} as const satisfies WorldClass
