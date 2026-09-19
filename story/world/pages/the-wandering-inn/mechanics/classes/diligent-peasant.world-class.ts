import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const diligentPeasant = {
  id: "01a0657e-1352-7493-9164-10dc98da02be",
  type: "page-type/world-class",
  slug: "diligent-peasant",
  title: "Diligent Peasant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
