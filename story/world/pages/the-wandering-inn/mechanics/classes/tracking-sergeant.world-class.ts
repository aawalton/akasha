import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trackingSergeant = {
  id: "01a0657e-026c-7125-8484-6622460a4c30",
  type: "page-type/world-class",
  slug: "tracking-sergeant",
  title: "Tracking Sergeant",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/goblinfriend-bug-captain"],
  createdAt: "2026-09-03T04:19:12.108Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
