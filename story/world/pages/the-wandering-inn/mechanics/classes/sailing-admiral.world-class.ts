import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sailingAdmiral = {
  id: "01a06586-0a28-744c-bc7b-2001f8da2dce",
  type: "page-type/world-class",
  slug: "sailing-admiral",
  title: "Sailing Admiral",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/intractable-admiral-of-sacrifice"],
  createdAt: "2026-09-03T04:27:58.376Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
