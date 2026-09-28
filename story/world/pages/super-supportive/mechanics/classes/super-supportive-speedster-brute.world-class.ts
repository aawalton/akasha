import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveSpeedsterBrute = {
  id: "01a0e9f1-6aac-7d54-89fd-c8f6dcf05202",
  type: "page-type/world-class",
  slug: "super-supportive-speedster-brute",
  title: "Speedster Brute",
  world: "world/super-supportive",
  aliases: ["speedster", "speed type", "speed-agility type"],
  description: "A Brute subclass built for moving very fast.",
} as const satisfies WorldClass
