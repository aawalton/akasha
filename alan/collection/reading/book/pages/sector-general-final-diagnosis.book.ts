import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralFinalDiagnosis = {
  id: "019db533-f38b-7171-bdf7-d260718c9460",
  type: "page-type/book",
  slug: "sector-general-final-diagnosis",
  title: "Sector General: Final Diagnosis",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 10,
  ownLength: 80000,
  publishedAt: "1998-07-15",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0812562682",
      externalLink: "https://amazon.com/dp/0812562682",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
