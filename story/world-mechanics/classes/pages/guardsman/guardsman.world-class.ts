import type { WorldClass } from "../../world-class.page-type.ts"

export const guardsman = {
  id: "01a0657e-01ed-7631-8a98-bf20ca10276e",
  pageTypeSlug: "world-class",
  slug: "guardsman",
  title: "Guardsman",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["shield-companion"],
  references: "jsonl",
} as const satisfies WorldClass
