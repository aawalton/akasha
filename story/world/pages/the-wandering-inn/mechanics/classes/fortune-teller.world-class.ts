import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fortuneTeller = {
  id: "01a0657e-1366-7bea-bd57-1c7e6d888f02",
  type: "page-type/world-class",
  slug: "fortune-teller",
  title: "Fortune Teller",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.454Z",
  updatedAt: "2026-09-22T13:29:04.000Z",
} as const satisfies WorldClass
