import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const negatedModal = {
  id: "01a05deb-2cf0-70cf-9cda-f855e7f11a74",
  pageTypeSlug: "sentence-shape",
  slug: "negated-modal",
  definition: "a modal followed by `not` and a verb taking no ending",
  rules: ["VP -> MODAL NEG VB | MODAL NEG BE NP | MODAL NEG BE ADJP | MODAL NEG BE VEN"],
} as const satisfies SentenceShape
