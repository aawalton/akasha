import type { Book } from "../../book.page-type.ts"

export const theGoodGuysFlexInTheCity = {
  id: "019db533-f391-7927-a77c-7497703df31e",
  pageTypeSlug: "book",
  slug: "the-good-guys-flex-in-the-city",
  title: "The Good Guys: Flex in the City",
  status: "not-started",
  unitSlug: "words",
  position: 13,
  ownLength: 101750,
  publishedAt: "2022-04-08",
  source: "kindle",
  externalId: "B09B5C2L7N",
  externalLink: "https://amazon.com/dp/B09B5C2L7N",
} as const satisfies Book
