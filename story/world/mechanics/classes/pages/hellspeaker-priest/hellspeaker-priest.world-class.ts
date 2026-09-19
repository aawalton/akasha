import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hellspeakerPriest = {
  id: "01a0657e-01f6-7b69-a238-5a59df05eb14",
  type: "page-type/world-class",
  slug: "hellspeaker-priest",
  title: "Hellspeaker Priest",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
