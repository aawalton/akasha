import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const otherwhereViiCloggedPassages = {
  id: "01a0ea41-c76a-70f2-9ae0-0184ab00fb79",
  type: "page-type/world-condition",
  slug: "otherwhere-vii-clogged-passages",
  title: "Clogged Passages",
  world: "world/god-of-trash",
  description: "Mana passages furred with impurities, so mana stutters and black blood is coughed.",
} as const satisfies WorldCondition
