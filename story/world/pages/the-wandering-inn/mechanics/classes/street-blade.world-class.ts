import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const streetBlade = {
  id: "01a0657e-0260-787d-9e6f-a4455377cae7",
  type: "page-type/world-class",
  slug: "street-blade",
  title: "Street Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
