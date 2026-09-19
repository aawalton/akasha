import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swiftRider = {
  id: "01a0657e-0262-7a58-906e-324bab45afa3",
  type: "page-type/world-class",
  slug: "swift-rider",
  title: "Swift Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
