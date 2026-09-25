import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const allTheSkills5 = {
  id: "019db533-f390-755a-9fc4-b227cbd3a465",
  type: "page-type/book",
  slug: "all-the-skills-5",
  title: "All The Skills 5",
  status: "completed",
  author:
    "Jan Hirshberg, Carl Bereiter, Marlene Scardamalia, Ann Brown, Valerie Anderson, Joseph Campione, Walter Kintsch",
  unit: "unit/words",
  position: 5,
  ownLength: 136000,
  ownProgress: 136000,
  publishedAt: "2025-03-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DSVBKLP9",
      externalLink: "https://amazon.com/dp/B0DSVBKLP9",
    },
  ],
} as const satisfies Book
