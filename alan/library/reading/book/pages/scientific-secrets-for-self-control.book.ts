import type { Book } from "akasha/alan/library/reading/book/book.page-type.types.ts"

export const scientificSecretsForSelfControl = {
  id: "019db533-f39d-7f7b-9770-707fd09d1029",
  type: "page-type/book",
  slug: "scientific-secrets-for-self-control",
  title: "Scientific Secrets for Self-Control",
  status: "completed",
  rank: "B",
  unit: "unit/words",
  ownLength: 45300,
  ownProgress: 45300,
} as const satisfies Book
