import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mortalChampion = {
  id: "01a0657e-13a3-793f-a198-caa8aadfc024",
  type: "page-type/world-class",
  slug: "mortal-champion",
  title: "Mortal Champion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
