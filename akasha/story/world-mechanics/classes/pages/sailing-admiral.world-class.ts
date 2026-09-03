import type { WorldClass } from "../world-class.page-type.ts"

export const sailingAdmiral = {
  id: "01a06586-0a28-744c-bc7b-2001f8da2dce",
  pageTypeSlug: "world-class",
  slug: "sailing-admiral",
  title: "Sailing Admiral",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["intractable-admiral-of-sacrifice"],
} as const satisfies WorldClass
