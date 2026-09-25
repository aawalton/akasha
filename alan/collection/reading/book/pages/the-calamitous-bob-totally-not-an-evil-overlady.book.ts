import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCalamitousBobTotallyNotAnEvilOverlady = {
  id: "019db533-f391-77fa-9bfe-7ded4ab5c761",
  type: "page-type/book",
  slug: "the-calamitous-bob-totally-not-an-evil-overlady",
  title: "The Calamitous Bob: (Totally not an) EVIL OVERLADY",
  status: "completed",
  unit: "unit/words",
  position: 8,
  ownLength: 134250,
  ownProgress: 134250,
  publishedAt: "2024-09-17",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DHD2T98N",
      externalLink: "https://amazon.com/dp/B0DHD2T98N",
    },
  ],
} as const satisfies Book
