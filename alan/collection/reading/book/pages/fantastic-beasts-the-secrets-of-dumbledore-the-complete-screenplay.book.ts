import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const fantasticBeastsTheSecretsOfDumbledoreTheCompleteScreenplay = {
  id: "019db533-f38b-7064-9e76-f7f12cd57ae0",
  type: "page-type/book",
  slug: "fantastic-beasts-the-secrets-of-dumbledore-the-complete-screenplay",
  title: "Fantastic Beasts: The Secrets of Dumbledore – The Complete Screenplay",
  status: "not-started",
  author: "J. K. Rowling, Steve Kloves",
  unit: "unit/words",
  position: 3,
  ownLength: 64750,
  publishedAt: "2022-07-19",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09WF65RV8",
      externalLink: "https://amazon.com/dp/B09WF65RV8",
    },
  ],
} as const satisfies Book
