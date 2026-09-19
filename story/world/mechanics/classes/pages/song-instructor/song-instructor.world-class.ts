import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const songInstructor = {
  id: "01a0657e-025c-7f8d-b77b-5fffccfb22b8",
  type: "page-type/world-class",
  slug: "song-instructor",
  title: "Song Instructor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
