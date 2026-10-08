import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirateCaptains = {
  id: "01a0657e-0237-7725-b24d-a2c7f7dd2673",
  type: "page-type/world-class",
  slug: "pirate-captains",
  title: "Pirate Captains",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.055Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
