import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doctor = {
  id: "01a0657e-1356-74a2-88f3-e22145b34455",
  type: "page-type/world-class",
  slug: "doctor",
  title: "Doctor",
  world: "world/the-wandering-inn",
  appearanceCount: 64,
  aliases: ["doctors"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.438Z",
  updatedAt: "2026-09-22T13:28:56.000Z",
} as const satisfies WorldClass
