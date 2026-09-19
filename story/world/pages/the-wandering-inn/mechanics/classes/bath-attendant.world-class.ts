import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bathAttendant = {
  id: "01a0657e-133c-7e4e-87d4-f59b780e3663",
  type: "page-type/world-class",
  slug: "bath-attendant",
  title: "Bath Attendant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
