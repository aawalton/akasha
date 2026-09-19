import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const nobleRider = {
  id: "01a0657e-13b2-7cc1-ad5e-2046cfd51592",
  type: "page-type/world-class",
  slug: "noble-rider",
  title: "Noble Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
