import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralAmbulanceShip = {
  id: "019db533-f38b-739e-a892-d18098400788",
  type: "page-type/book",
  slug: "sector-general-ambulance-ship",
  title: "Sector General: Ambulance Ship",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 4,
  ownLength: 46000,
  publishedAt: "1979-09-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0345285131",
      externalLink: "https://amazon.com/dp/0345285131",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
