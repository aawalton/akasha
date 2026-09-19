import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const roaster = {
  id: "01a06586-0a23-7c20-8e5e-da679d4f1d55",
  type: "page-type/world-class",
  slug: "roaster",
  title: "Roaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
