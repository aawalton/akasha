import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const passiveVerb = {
  id: "01a05db8-c099-77f2-b095-fd54d3b12643",
  pageTypeSlug: "sentence-shape",
  slug: "passive-verb",
  definition: "`be` followed by a past participle",
  rules: ["VP -> BE VEN | BE VEN PP"],
} as const satisfies SentenceShape
