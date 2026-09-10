import type { Book } from "../book.page-type.types.ts"

export const beneathTheDragoneyeMoonsNewHorizons = {
  id: "019db533-f390-798b-8243-057df7a2f269",
  pageTypeSlug: "book",
  type: "book",
  slug: "beneath-the-dragoneye-moons-new-horizons",
  title: "Beneath the Dragoneye Moons: New Horizons",
  status: "completed",
  author: "Selkie Myth",
  unit: "words",
  position: 8,
  ownLength: 213250,
  ownProgress: 213250,
  publishedAt: "2025-01-20",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  source: "kindle",
  externalId: "B0DTGT97H7",
  externalLink: "https://amazon.com/dp/B0DTGT97H7",
} as const satisfies Book
