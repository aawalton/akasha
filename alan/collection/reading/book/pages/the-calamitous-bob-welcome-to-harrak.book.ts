import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCalamitousBobWelcomeToHarrak = {
  id: "019db533-f391-7824-a972-f8a00e701a23",
  type: "page-type/book",
  slug: "the-calamitous-bob-welcome-to-harrak",
  title: "The Calamitous Bob: Welcome to Harrak",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 91750,
  ownProgress: 91750,
  publishedAt: "2023-06-03",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C72T3YXR",
      externalLink: "https://amazon.com/dp/B0C72T3YXR",
    },
  ],
} as const satisfies Book
