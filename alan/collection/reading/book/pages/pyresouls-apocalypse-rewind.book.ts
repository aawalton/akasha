import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pyresoulsApocalypseRewind = {
  id: "019db533-f391-73c8-a976-89951c9ac3b8",
  type: "page-type/book",
  slug: "pyresouls-apocalypse-rewind",
  title: "Pyresouls Apocalypse: Rewind",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 114500,
  ownProgress: 114500,
  publishedAt: "2020-08-23",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08GL233F2",
      externalLink: "https://amazon.com/dp/B08GL233F2",
    },
  ],
} as const satisfies Book
