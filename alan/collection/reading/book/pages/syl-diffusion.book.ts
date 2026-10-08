import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sylDiffusion = {
  id: "019db533-f391-7733-9a3c-4265a4ec32d7",
  type: "page-type/book",
  slug: "syl-diffusion",
  title: "Syl: Diffusion",
  status: "completed",
  author: "Robert Combas",
  unit: "unit/words",
  position: 3,
  ownLength: 155750,
  ownProgress: 155750,
  publishedAt: "2025-06-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F5BV583P",
      externalLink: "https://amazon.com/dp/B0F5BV583P",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
