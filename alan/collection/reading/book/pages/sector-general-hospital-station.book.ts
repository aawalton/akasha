import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralHospitalStation = {
  id: "019db533-f38b-73ad-b9ab-1e70af546b2f",
  type: "page-type/book",
  slug: "sector-general-hospital-station",
  title: "Sector General: Hospital Station",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 1,
  ownLength: 47750,
  publishedAt: "1979-08-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0345283538",
      externalLink: "https://amazon.com/dp/0345283538",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
