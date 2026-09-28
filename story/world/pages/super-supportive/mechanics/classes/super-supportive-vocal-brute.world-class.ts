import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveVocalBrute = {
  id: "01a0e9f1-6aac-7fdc-af60-68fa49c15d2a",
  type: "page-type/world-class",
  slug: "super-supportive-vocal-brute",
  title: "Vocal Brute",
  world: "world/super-supportive",
  aliases: ["vocal subtype", "orator Brute", "Vocal"],
  description: "A Brute subclass whose power is in the voice.",
} as const satisfies WorldClass
