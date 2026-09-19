import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magelords = {
  id: "01a0657e-022a-71c3-898d-9c9db8af0ad2",
  type: "page-type/world-class",
  slug: "magelords",
  title: "Magelords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
