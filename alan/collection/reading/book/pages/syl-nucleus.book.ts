import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sylNucleus = {
  id: "019db533-f391-7744-8622-598fb16cc40c",
  type: "page-type/book",
  slug: "syl-nucleus",
  title: "Syl: Nucleus",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 165250,
  ownProgress: 165250,
  publishedAt: "2024-11-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DJY8MXZW",
      externalLink: "https://amazon.com/dp/B0DJY8MXZW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
