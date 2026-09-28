import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveOpposite = {
  id: "01a0e9f1-065e-7986-8ddb-56ce90796160",
  type: "page-type/world-mechanic",
  slug: "super-supportive-opposite",
  title: "Opposite",
  world: "world/super-supportive",
  description:
    "The unknown person on another world who gives or receives the other half of a wordchain trade.",
} as const satisfies WorldMechanic
