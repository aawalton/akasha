import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fatebreakerChild = {
  id: "01a0657e-1363-794b-835c-38517fa656a4",
  type: "page-type/world-class",
  slug: "fatebreaker-child",
  title: "Fatebreaker Child",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  evolvesFromSlugs: ["world-class/emberbearer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.451Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
