import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crossbowSpeedHunter = {
  id: "01a0657e-1350-7307-b19f-5e4147efe1a7",
  type: "page-type/world-class",
  slug: "crossbow-speed-hunter",
  title: "Crossbow Speed Hunter",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/vampire-hunter"],
  createdAt: "2026-09-03T04:19:16.432Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
