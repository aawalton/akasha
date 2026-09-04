import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const closingCount = {
  id: "01a06e4c-4b93-7d7a-a9a6-9456474b061a",
  pageTypeSlug: "sentence-shape",
  slug: "closing-count",
  definition: "a count closing a sentence that sums a list the sentence already gave",
  allowed: false,
  code: "ts",
  test: "ts",
  reason: "A closing count sends a reader back over the list to learn what the count covers.",
} as const satisfies SentenceShape
