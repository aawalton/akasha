import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveMentalTexting = {
  id: "01a0e9f2-9a51-7265-86fb-d4f2680cac90",
  type: "page-type/world-mechanic",
  slug: "super-supportive-mental-texting",
  title: "Mental texting",
  world: "world/super-supportive",
  aliases: ["air texting"],
  description: "Sending texts through the interface by thought, or by typing on air.",
} as const satisfies WorldMechanic
