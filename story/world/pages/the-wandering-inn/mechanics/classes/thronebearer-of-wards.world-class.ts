import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const thronebearerOfWards = {
  id: "01a0657e-026b-7aba-9d08-dfab02a30360",
  type: "page-type/world-class",
  slug: "thronebearer-of-wards",
  title: "Thronebearer of Wards",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/thronebearer-of-the-6th-princess"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.107Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
