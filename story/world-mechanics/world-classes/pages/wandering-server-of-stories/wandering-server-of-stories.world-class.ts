import type { WorldClass } from "../../world-class.page-type.ts"

export const wanderingServerOfStories = {
  id: "01a0657e-026f-77fd-9134-d4779eca25a1",
  pageTypeSlug: "world-class",
  slug: "wandering-server-of-stories",
  title: "Wandering Server of Stories",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["head-server-of-tales-and-fables"],
  references: "jsonl",
} as const satisfies WorldClass
