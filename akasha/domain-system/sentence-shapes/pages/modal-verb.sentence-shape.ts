import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const modalVerb = {
  id: "01a05db8-c099-75ee-8437-836bad470efe",
  pageTypeSlug: "sentence-shape",
  slug: "modal-verb",
  definition: "a modal followed by a verb taking no ending",
  rules: ["VP -> MODAL VB | MODAL BE NP | MODAL BE ADJP | MODAL BE VEN"],
} as const satisfies SentenceShape
