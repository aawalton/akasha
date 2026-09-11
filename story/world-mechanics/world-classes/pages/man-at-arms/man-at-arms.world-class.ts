import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const manAtArms = {
  id: "01a0657e-022c-7a25-b72a-6e01c421b7e3",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "man-at-arms",
  title: "Man-at-Arms",
  world: "the-wandering-inn",
  aliases: ["Man-At-Arms"],
  references: "jsonl",
} as const satisfies WorldClass
