import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const allTheSkills2 = {
  id: "019db533-f390-7687-a730-d004f0f4bf38",
  type: "page-type/book",
  slug: "all-the-skills-2",
  title: "All The Skills 2",
  status: "completed",
  author:
    "Jan Hirshberg, Carl Bereiter, Marlene Scardamalia, Ann Brown, Valerie Anderson, Joseph Campione, Walter Kintsch",
  unit: "unit/words",
  position: 2,
  ownLength: 145750,
  ownProgress: 145750,
  publishedAt: "2023-06-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C1DP23YZ",
      externalLink: "https://amazon.com/dp/B0C1DP23YZ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
