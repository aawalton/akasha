import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const geomancer = {
  id: "01a0657e-136b-7c59-a464-6f4daba5dec9",
  type: "page-type/world-class",
  slug: "geomancer",
  title: "Geomancer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
