import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const robertLangdonTheSecretOfSecrets = {
  id: "019db533-f38b-7169-8844-24b4ce70717f",
  type: "page-type/book",
  slug: "robert-langdon-the-secret-of-secrets",
  title: "Robert Langdon: The Secret of Secrets",
  status: "not-started",
  author: "Dan Brown",
  unit: "unit/words",
  position: 6,
  ownLength: 169500,
  publishedAt: "2025-09-09",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DTT5LV77",
      externalLink: "https://amazon.com/dp/B0DTT5LV77",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
