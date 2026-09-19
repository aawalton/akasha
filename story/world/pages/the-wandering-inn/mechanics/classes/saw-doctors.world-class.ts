import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sawDoctors = {
  id: "01a0657e-024a-7612-bb2d-3c759b3fec32",
  type: "page-type/world-class",
  slug: "saw-doctors",
  title: "Saw Doctors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
