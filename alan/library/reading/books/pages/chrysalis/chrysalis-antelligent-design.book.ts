import type { Book } from "../../book.page-type.ts"

export const chrysalisAntelligentDesign = {
  id: "019db533-f390-7b8b-a74e-30578550a84d",
  pageTypeSlug: "book",
  slug: "chrysalis-antelligent-design",
  title: "Chrysalis: Antelligent Design",
  status: "completed",
  unitSlug: "words",
  position: 3,
  ownLength: 184000,
  ownProgress: 184000,
  publishedAt: "2022-12-27",
  partOfSlugs: ["book-series/chrysalis"],
  source: "kindle",
  externalId: "B0BBWJ8X67",
  externalLink: "https://amazon.com/dp/B0BBWJ8X67",
} as const satisfies Book
