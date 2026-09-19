import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bannerCommander = {
  id: "01a0657e-01b0-78f5-910d-5f7d4cd0b97a",
  type: "page-type/world-class",
  slug: "banner-commander",
  title: "Banner Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
