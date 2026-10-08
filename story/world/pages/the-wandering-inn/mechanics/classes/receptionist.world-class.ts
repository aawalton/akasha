import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const receptionist = {
  id: "01a0657e-0245-7fa6-a8e6-1c1db05321fa",
  type: "page-type/world-class",
  slug: "receptionist",
  title: "Receptionist",
  world: "world/the-wandering-inn",
  appearanceCount: 123,
  aliases: ["receptionists"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.069Z",
  updatedAt: "2026-09-22T13:29:51.000Z",
} as const satisfies WorldClass
