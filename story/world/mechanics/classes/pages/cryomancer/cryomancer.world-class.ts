import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cryomancer = {
  id: "01a0657e-01cd-7f94-829c-2ca5c2097fcc",
  type: "page-type/world-class",
  slug: "cryomancer",
  title: "Cryomancer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
