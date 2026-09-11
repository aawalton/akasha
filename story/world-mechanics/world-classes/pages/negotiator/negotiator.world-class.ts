import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const negotiator = {
  id: "01a0657e-0234-75ee-be8e-54bae5e8ed48",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "negotiator",
  title: "Negotiator",
  world: "the-wandering-inn",
  aliases: ["negotiators"],
  references: "jsonl",
} as const satisfies WorldClass
