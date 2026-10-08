import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hedonisticWastrel = {
  id: "01a0657e-01f6-7478-88a8-26db9a43db6b",
  type: "page-type/world-class",
  slug: "hedonistic-wastrel",
  title: "Hedonistic Wastrel",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/genius-of-sloth"],
  createdAt: "2026-09-03T04:19:11.990Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
