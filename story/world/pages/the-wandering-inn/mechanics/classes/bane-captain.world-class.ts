import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const baneCaptain = {
  id: "01a0657e-01b0-7bf4-9271-3de5eba769e9",
  type: "page-type/world-class",
  slug: "bane-captain",
  title: "Bane Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
