import type { Book } from "../../book.page-type.ts"

export const chrysalisTheAntventureBegins = {
  id: "019db533-f390-7ba3-94f6-01fc614d26c4",
  pageTypeSlug: "book",
  slug: "chrysalis-the-antventure-begins",
  title: "Chrysalis: The Antventure Begins",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 1,
  ownLength: 166000,
  ownProgress: 166000,
  publishedAt: "2022-06-07",
  partOfSlugs: ["book-series/chrysalis"],
  source: "kindle",
  externalId: "B09T7ZN7NC",
  externalLink: "https://amazon.com/dp/B09T7ZN7NC",
} as const satisfies Book
