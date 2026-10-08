import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chrysalisAntvanceIntoTheUnknown = {
  id: "019db533-f390-7ace-a470-63bdd27ac423",
  type: "page-type/book",
  slug: "chrysalis-antvance-into-the-unknown",
  title: "Chrysalis: Antvance into the Unknown",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 188000,
  ownProgress: 188000,
  publishedAt: "2024-09-11",
  partOfCollections: ["book-series/chrysalis"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D94PLGPC",
      externalLink: "https://amazon.com/dp/B0D94PLGPC",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
