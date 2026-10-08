import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const allTheSkills3 = {
  id: "019db533-f390-7696-8652-60c15fcef139",
  type: "page-type/book",
  slug: "all-the-skills-3",
  title: "All The Skills 3",
  status: "completed",
  author: "Honour Rae",
  unit: "unit/words",
  position: 3,
  ownLength: 141000,
  ownProgress: 141000,
  publishedAt: "2024-03-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CPD6ZS83",
      externalLink: "https://amazon.com/dp/B0CPD6ZS83",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
