import type { Book } from "../../book.page-type.ts"

export const spyTheLie = {
  id: "019db533-f39d-7f83-9a80-b01bf406b538",
  pageTypeSlug: "book",
  slug: "spy-the-lie",
  title: "Spy the Lie",
  status: "not-started",
  author: "Philip Houston",
  unitSlug: "words",
  ownLength: 73050,
} as const satisfies Book
