import type { Book } from "../book.page-type.types.ts"

export const disgardiumEnemyOfTheInferno = {
  id: "019db533-f390-7dae-af5e-2ae31dac2c4c",
  pageTypeSlug: "book",
  type: "book",
  slug: "disgardium-enemy-of-the-inferno",
  title: "Disgardium: Enemy of the Inferno",
  status: "not-started",
  unit: "words",
  position: 8,
  ownLength: 116750,
  publishedAt: "2021-08-09",
  partOfCollections: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B094DHTJP2",
  externalLink: "https://amazon.com/dp/B094DHTJP2",
} as const satisfies Book
