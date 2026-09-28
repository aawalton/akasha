import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVTalents = {
  id: "01a0e9f3-e3e8-74ab-9121-65d11936e83a",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-talents",
  title: "Talents",
  world: "world/ends-of-magic",
  aliases: ["Talent", "Permanent Talent", "Pending Talent"],
  description: "A personal power Davrar grants a person, ranked by use.",
} as const satisfies WorldMechanic
