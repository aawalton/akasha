import type { WorldClass } from "../world-class.page-type.ts"

export const portsideInnkeeper = {
  id: "01a0657e-023e-7638-bebd-77b39c82f5bf",
  pageTypeSlug: "world-class",
  slug: "portside-innkeeper",
  title: "Portside Innkeeper",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["witness-innkeeper"],
} as const satisfies WorldClass
