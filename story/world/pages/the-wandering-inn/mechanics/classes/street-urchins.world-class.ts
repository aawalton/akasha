import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const streetUrchins = {
  id: "01a06586-0a5d-77c1-916e-c74f6325c088",
  type: "page-type/world-class",
  slug: "street-urchins",
  title: "Street Urchins",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
