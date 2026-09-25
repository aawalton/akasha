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
} as const satisfies Book
