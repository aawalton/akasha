import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const marines = {
  id: "01a0657e-139d-7105-aad6-1027a71498b2",
  type: "page-type/world-class",
  slug: "marines",
  title: "Marines",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.509Z",
  updatedAt: "2026-09-22T13:29:35.000Z",
} as const satisfies WorldClass
