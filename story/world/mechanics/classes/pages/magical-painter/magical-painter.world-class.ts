import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicalPainter = {
  id: "01a0657e-139b-7772-b052-236a70fc99ab",
  type: "page-type/world-class",
  slug: "magical-painter",
  title: "Magical Painter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
