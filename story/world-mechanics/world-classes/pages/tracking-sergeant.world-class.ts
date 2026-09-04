import type { WorldClass } from "../world-class.page-type.ts"

export const trackingSergeant = {
  id: "01a0657e-026c-7125-8484-6622460a4c30",
  pageTypeSlug: "world-class",
  slug: "tracking-sergeant",
  title: "Tracking Sergeant",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["goblinfriend-bug-captain"],
} as const satisfies WorldClass
