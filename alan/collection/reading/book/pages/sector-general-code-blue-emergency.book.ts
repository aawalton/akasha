import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralCodeBlueEmergency = {
  id: "019db533-f38b-718b-9e73-25ac0b477160",
  type: "page-type/book",
  slug: "sector-general-code-blue-emergency",
  title: "Sector General: Code Blue - Emergency",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 7,
  ownLength: 70000,
  publishedAt: "1987-06-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0345341724",
      externalLink: "https://amazon.com/dp/0345341724",
    },
  ],
} as const satisfies Book
