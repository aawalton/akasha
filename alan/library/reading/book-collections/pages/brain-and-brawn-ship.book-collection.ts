import type { BookCollection } from "../book-collection.page-type.ts"

export const brainAndBrawnShip = {
  id: "01a06808-148e-7009-8596-d4b5153081b8",
  pageTypeSlug: "book-collection",
  slug: "brain-and-brawn-ship",
  title: "Brain & Brawn Ship",
  partOfSlugs: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
