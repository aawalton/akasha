import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const nightSinger = {
  id: "01a0657e-13b1-72c3-95fd-f1a7868a85cd",
  type: "page-type/world-class",
  slug: "night-singer",
  title: "Night Singer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
