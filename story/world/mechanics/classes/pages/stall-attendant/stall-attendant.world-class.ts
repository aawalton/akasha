import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stallAttendant = {
  id: "01a0657e-025f-734c-983d-7afa611ac3a4",
  type: "page-type/world-class",
  slug: "stall-attendant",
  title: "Stall Attendant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
