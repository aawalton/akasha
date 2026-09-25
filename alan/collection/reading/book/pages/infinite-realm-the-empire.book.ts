import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const infiniteRealmTheEmpire = {
  id: "019db533-f391-7b3f-9c28-16cf6dbd15d6",
  type: "page-type/book",
  slug: "infinite-realm-the-empire",
  title: "Infinite Realm: The Empire",
  status: "not-started",
  author: "Edmund Husserl, Dorion Cairns",
  unit: "unit/words",
  position: 4,
  ownLength: 275750,
  publishedAt: "2022-07-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B622P4J8",
      externalLink: "https://amazon.com/dp/B0B622P4J8",
    },
  ],
} as const satisfies Book
