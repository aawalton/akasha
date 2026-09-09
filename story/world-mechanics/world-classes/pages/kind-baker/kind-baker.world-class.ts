import type { WorldClass } from "../../world-class.page-type.ts"

export const kindBaker = {
  id: "01a0657e-1378-7cdd-af6c-714d1ee1de15",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "kind-baker",
  title: "Kind Baker",
  world: "the-wandering-inn",
  evolvesToSlugs: ["baker-of-presents-gifted-chef"],
} as const satisfies WorldClass
