import type { Book } from "../../book.page-type.ts"

export const sectorGeneralFinalDiagnosis = {
  id: "019db533-f38b-7171-bdf7-d260718c9460",
  pageTypeSlug: "book",
  slug: "sector-general-final-diagnosis",
  title: "Sector General: Final Diagnosis",
  kind: "read",
  status: "not-started",
  author: "James White",
  unitSlug: "words",
  position: 10,
  ownLength: 80000,
  publishedAt: "1998-07-15",
  source: "kindle",
  externalId: "0812562682",
  externalLink: "https://amazon.com/dp/0812562682",
} as const satisfies Book
