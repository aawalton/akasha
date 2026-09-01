import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const adjectiveAfterVerb = {
  id: "01a05e1c-f220-7080-9633-02a1a5ea442e",
  pageTypeSlug: "sentence-shape",
  slug: "adjective-after-verb",
  definition: "an adjective after a verb saying what state something is left in",
  rules: ["VP -> VP ADJP"],
} as const satisfies SentenceShape
