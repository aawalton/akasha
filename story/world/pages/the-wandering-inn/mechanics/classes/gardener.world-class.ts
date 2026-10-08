import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gardener = {
  id: "01a0657e-01df-7db3-8231-41e2363a05eb",
  type: "page-type/world-class",
  slug: "gardener",
  title: "Gardener",
  world: "world/the-wandering-inn",
  appearanceCount: 35,
  aliases: ["gardeners"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.967Z",
  updatedAt: "2026-09-22T13:29:04.000Z",
} as const satisfies WorldClass
