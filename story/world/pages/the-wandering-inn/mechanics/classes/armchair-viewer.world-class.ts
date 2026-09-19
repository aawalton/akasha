import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const armchairViewer = {
  id: "01a0657e-1330-7e3d-a5fa-0d048ab33123",
  type: "page-type/world-class",
  slug: "armchair-viewer",
  title: "Armchair Viewer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
