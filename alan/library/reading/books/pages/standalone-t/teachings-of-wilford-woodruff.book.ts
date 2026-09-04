import type { Book } from "../../book.page-type.ts"

export const teachingsOfWilfordWoodruff = {
  id: "019db533-f39d-78ae-bc23-cd22aa538858",
  pageTypeSlug: "book",
  slug: "teachings-of-wilford-woodruff",
  title: "Teachings of Wilford Woodruff",
  status: "not-started",
  author: "Wilford Woodruff",
  unitSlug: "words",
  position: 5,
  ownLength: 87500,
} as const satisfies Book
