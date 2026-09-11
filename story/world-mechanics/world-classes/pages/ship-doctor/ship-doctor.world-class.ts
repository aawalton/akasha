import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const shipDoctor = {
  id: "01a0657e-0254-734b-84d1-d8174035d54e",
  type: "world-class",
  slug: "ship-doctor",
  title: "Ship Doctor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
