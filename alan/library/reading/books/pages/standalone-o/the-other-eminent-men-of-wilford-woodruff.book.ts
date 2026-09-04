import type { Book } from "../../book.page-type.ts"

export const theOtherEminentMenOfWilfordWoodruff = {
  id: "019db533-f39d-7647-b74d-933b3643ddf7",
  pageTypeSlug: "book",
  slug: "the-other-eminent-men-of-wilford-woodruff",
  title: "The Other Eminent Men of Wilford Woodruff",
  status: "paused",
  author: "Vicki Jo Anderson",
  unitSlug: "words",
  position: 3,
  ownLength: 99250,
  ownProgress: 2250,
} as const satisfies Book
