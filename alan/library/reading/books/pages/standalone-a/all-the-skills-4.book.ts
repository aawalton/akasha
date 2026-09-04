import type { Book } from "../../book.page-type.ts"

export const allTheSkills4 = {
  id: "019db533-f390-76b9-8448-b42760cf07bf",
  pageTypeSlug: "book",
  slug: "all-the-skills-4",
  title: "All The Skills 4",
  status: "completed",
  author: "William Shakespeare",
  unitSlug: "words",
  position: 4,
  ownLength: 140250,
  ownProgress: 140250,
  publishedAt: "2024-08-20",
  source: "kindle",
  externalId: "B0CW1FXD9G",
  externalLink: "https://amazon.com/dp/B0CW1FXD9G",
} as const satisfies Book
