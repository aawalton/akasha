import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVForesight = {
  id: "01a0ea00-60ad-7fd5-9485-1fc9de3be932",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-foresight",
  title: "Foresight",
  world: "world/ends-of-magic",
  aliases: ["prophecy", "fate-reading", "fate-weaving", "foretelling"],
  description: "Magic of fate and the future.",
} as const satisfies WorldMechanic
