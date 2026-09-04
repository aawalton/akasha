import type { Book } from "../../book.page-type.ts"

export const allTheSkills5 = {
  id: "019db533-f390-755a-9fc4-b227cbd3a465",
  pageTypeSlug: "book",
  slug: "all-the-skills-5",
  title: "All The Skills 5",
  status: "completed",
  author:
    "Jan Hirshberg, Carl Bereiter, Marlene Scardamalia, Ann Brown, Valerie Anderson, Joseph Campione, Walter Kintsch",
  unitSlug: "words",
  position: 5,
  ownLength: 136000,
  ownProgress: 136000,
  publishedAt: "2025-03-25",
  source: "kindle",
  externalId: "B0DSVBKLP9",
  externalLink: "https://amazon.com/dp/B0DSVBKLP9",
} as const satisfies Book
