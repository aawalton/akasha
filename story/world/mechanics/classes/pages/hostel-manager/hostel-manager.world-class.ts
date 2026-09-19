import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hostelManager = {
  id: "01a0657e-1374-7836-854e-4b5925180c1e",
  type: "page-type/world-class",
  slug: "hostel-manager",
  title: "Hostel Manager",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
