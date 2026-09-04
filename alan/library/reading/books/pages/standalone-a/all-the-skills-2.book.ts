import type { Book } from "../../book.page-type.ts"

export const allTheSkills2 = {
  id: "019db533-f390-7687-a730-d004f0f4bf38",
  pageTypeSlug: "book",
  slug: "all-the-skills-2",
  title: "All The Skills 2",
  kind: "read",
  status: "completed",
  author:
    "Jan Hirshberg, Carl Bereiter, Marlene Scardamalia, Ann Brown, Valerie Anderson, Joseph Campione, Walter Kintsch",
  unitSlug: "words",
  position: 2,
  ownLength: 145750,
  ownProgress: 145750,
  publishedAt: "2023-06-13",
  source: "kindle",
  externalId: "B0C1DP23YZ",
  externalLink: "https://amazon.com/dp/B0C1DP23YZ",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
