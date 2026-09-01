import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const perfectVerb = {
  id: "01a05db8-c099-7841-955c-1e37f031891b",
  pageTypeSlug: "sentence-shape",
  slug: "perfect-verb",
  definition: "`have` followed by a past participle",
  rules: ["VP -> AUX VEN | AUX VEN NP"],
} as const satisfies SentenceShape
