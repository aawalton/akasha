import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const classRelicGuardian = {
  id: "01a0658b-0668-7789-bc3a-318a684034ac",
  type: "world-class",
  slug: "class-relic-guardian",
  title: "Class – Relic Guardian",
  world: "the-wandering-inn",
  evolvesToSlugs: ["skeleton-knight"],
} as const satisfies WorldClass
