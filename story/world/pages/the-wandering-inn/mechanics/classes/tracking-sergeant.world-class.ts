import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trackingSergeant = {
  id: "01a0657e-026c-7125-8484-6622460a4c30",
  type: "page-type/world-class",
  slug: "tracking-sergeant",
  title: "Tracking Sergeant",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["goblinfriend-bug-captain"],
} as const satisfies WorldClass
