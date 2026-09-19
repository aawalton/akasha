import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const negotiator = {
  id: "01a0657e-0234-75ee-be8e-54bae5e8ed48",
  type: "page-type/world-class",
  slug: "negotiator",
  title: "Negotiator",
  world: "world/the-wandering-inn",
  aliases: ["negotiators"],
  references: "jsonl",
} as const satisfies WorldClass
