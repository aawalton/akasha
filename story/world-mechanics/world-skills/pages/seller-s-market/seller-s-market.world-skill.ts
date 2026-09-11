import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const sellerSMarket = {
  id: "01a0657d-02b8-7da9-887d-378dca63685b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "seller-s-market",
  title: "Seller’s Market",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
