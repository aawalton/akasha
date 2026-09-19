import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranStoneguard = {
  id: "01a06586-0a6f-7df0-ae47-639684543ae1",
  type: "page-type/world-class",
  slug: "veteran-stoneguard",
  title: "Veteran Stoneguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
