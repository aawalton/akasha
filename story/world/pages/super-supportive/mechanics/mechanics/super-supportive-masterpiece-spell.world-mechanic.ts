import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveMasterpieceSpell = {
  id: "01a0e9f8-aa22-7861-a75f-6ff8bce7ed53",
  type: "page-type/world-mechanic",
  slug: "super-supportive-masterpiece-spell",
  title: "Masterpiece spell",
  world: "world/super-supportive",
  description:
    "A named class of great, difficult wizard spells collected in books indexed by concept.",
} as const satisfies WorldMechanic
