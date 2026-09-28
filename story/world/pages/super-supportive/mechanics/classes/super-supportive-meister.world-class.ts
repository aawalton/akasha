import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMeister = {
  id: "01a0e9f2-30e0-7d15-8c89-9ba98ac34794",
  type: "page-type/world-class",
  slug: "super-supportive-meister",
  title: "Meister",
  world: "world/super-supportive",
  aliases: ["weaponmaster"],
  description: "The weaponmaster class, powerful but inflexible, tied to one tool or weapon type.",
} as const satisfies WorldClass
