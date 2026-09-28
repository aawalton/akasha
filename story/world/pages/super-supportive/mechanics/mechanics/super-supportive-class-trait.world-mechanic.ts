import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveClassTrait = {
  id: "01a0e9f0-3dfa-7e6f-afc9-4409552f8f5e",
  type: "page-type/world-mechanic",
  slug: "super-supportive-class-trait",
  title: "Class trait",
  world: "world/super-supportive",
  aliases: ["trait", "primary class trait"],
  description: "A class-given effect named for a color, picked by an Avowed after their skills.",
} as const satisfies WorldMechanic
