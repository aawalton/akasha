import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const understandingTheSecretsOfHumanPerception = {
  id: "019db533-f39d-7ea5-b0eb-82ed7d79e240",
  type: "page-type/book",
  slug: "understanding-the-secrets-of-human-perception",
  title: "Understanding the Secrets of Human Perception",
  status: "not-started",
  author: "Frans Viljoen, Jehoshaphat Njau",
  unit: "unit/words",
  ownLength: 182250,
} as const satisfies Book
