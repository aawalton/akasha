import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveCloseness = {
  id: "01a0e9f8-aa22-719a-84aa-9b10ea24978e",
  type: "page-type/world-mechanic",
  slug: "super-supportive-closeness",
  title: "Closeness",
  world: "world/super-supportive",
  aliases: ["existential closeness"],
  description:
    "A comfortable, friendly authority presence drawn near without moving, felt like knowing something good is in the room.",
} as const satisfies WorldMechanic
