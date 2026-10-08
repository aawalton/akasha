import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const portsideInnkeeper = {
  id: "01a0657e-023e-7638-bebd-77b39c82f5bf",
  type: "page-type/world-class",
  slug: "portside-innkeeper",
  title: "Portside Innkeeper",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/witness-innkeeper"],
  createdAt: "2026-09-03T04:19:12.062Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
