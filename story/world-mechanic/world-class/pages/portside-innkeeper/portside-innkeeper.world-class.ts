import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const portsideInnkeeper = {
  id: "01a0657e-023e-7638-bebd-77b39c82f5bf",
  type: "world-class",
  slug: "portside-innkeeper",
  title: "Portside Innkeeper",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["witness-innkeeper"],
} as const satisfies WorldClass
