import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const witnessInnkeeper = {
  id: "01a0657e-0272-7e81-8728-787cce66ec3e",
  type: "page-type/world-class",
  slug: "witness-innkeeper",
  title: "Witness Innkeeper",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/portside-innkeeper"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.114Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
