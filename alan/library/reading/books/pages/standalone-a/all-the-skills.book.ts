import type { Book } from "../../book.page-type.ts"

export const allTheSkills = {
  id: "019db533-f390-76f2-ab4e-ed437735a970",
  pageTypeSlug: "book",
  slug: "all-the-skills",
  title: "All The Skills",
  status: "completed",
  author: "Elizabeth Letcavage",
  unitSlug: "words",
  position: 1,
  ownLength: 129000,
  ownProgress: 129000,
  publishedAt: "2022-12-20",
  source: "kindle",
  externalId: "B0BM51RQR8",
  externalLink: "https://amazon.com/dp/B0BM51RQR8",
} as const satisfies Book
