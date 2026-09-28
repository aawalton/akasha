import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeisterOfTraps = {
  id: "01a0e9f2-30e0-7e85-8a05-2eb188314046",
  type: "page-type/world-class",
  slug: "super-supportive-meister-of-traps",
  title: "Trap Meister",
  world: "world/super-supportive",
  aliases: ["Meister (Traps)"],
  description: "A Meister subclass that works with traps.",
} as const satisfies WorldClass
