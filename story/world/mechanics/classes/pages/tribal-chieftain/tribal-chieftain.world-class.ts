import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tribalChieftain = {
  id: "01a06586-0a6c-7d7d-bb55-ae66997672df",
  type: "page-type/world-class",
  slug: "tribal-chieftain",
  title: "Tribal Chieftain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
