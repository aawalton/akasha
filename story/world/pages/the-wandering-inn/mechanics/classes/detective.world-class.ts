import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const detective = {
  id: "01a0657e-01cf-731a-a40d-f1012a3dcd7b",
  type: "page-type/world-class",
  slug: "detective",
  title: "Detective",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
