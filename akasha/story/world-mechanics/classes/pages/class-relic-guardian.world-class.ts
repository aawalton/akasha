import type { WorldClass } from "../world-class.page-type.ts"

export const classRelicGuardian = {
  id: "01a0658b-0668-7789-bc3a-318a684034ac",
  pageTypeSlug: "world-class",
  slug: "class-relic-guardian",
  title: "Class – Relic Guardian",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["skeleton-knight"],
} as const satisfies WorldClass
